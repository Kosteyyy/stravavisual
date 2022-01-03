import React, { useState, useEffect } from "react";
import URLSearchParams from 'url-search-params';
import { useLocation } from "react-router-dom";


import ActivityFilter from './ActivityFilter.jsx';
import ResultList from './ResultList.jsx';
import { isNear, getAddress, getAddressFromMapBox } from './functions.js';
import { Aggregate } from './Aggregate.jsx';
import Loading from "./Loading.jsx";

function translateType(type) {
    switch(type) {
        case 'Run': return 'Бег';
        case 'NordicSki': return 'Лыжи';
        case 'Ride': return 'Велосипед';
        case 'Swim': return 'Плавание';
        default: return type;
    }
}

export default function Activities(props) { 
    let { activityList, setActivityList, accessToken, chartColors, trainingPlaces, addTrainingPlace, saveTrainingPlaces, renameTrainingPlace } = props;
    let currentLocation = useLocation();
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({});
    // console.log("rendering Activities");
    const [queryParams, setQueryParams] = useState({}); //{after: "2021-11-23", before: "2021-12-23", type: "Ride"}
    const [activities, setActivities] = useState([]); //Сохраняю в состоянии поскольку они отфильтрованы, возможно, надо заменить 
    // на входящий список с фильтром. пока что параметры фильтра сбрасываются при навигации, поэтому приходится делать новый запрос
    //console.log("ACTIVITIES: queryParams: ", queryParams, "loading: ", loading, "Activities.length: ", activities.length);

    function filterAdd(object) {
        //Добавляет к фильтру объект
        setFilter({...filter, ...object});
    }

    function filterRemove(key) {
        //Удаляет из фильтра ключ фильтрования
        let newFilter = {...filter};
        delete newFilter[key];
        setFilter(newFilter);
    }

    function formatMapBoxAddress(address) {
        address = address.replace('Russia, ', '');
        address = address.replace('Moscow, ', '');
        address = address.replace(/\d{6},\s/, '');
        address = address.replace(', Russia', '');
        return address;
    }

    function applyFilter(dataArray, filter) {
        //Применяет фильтр вида {prop1: v1, prop2: v2} к массиву объектов
        return dataArray.filter((data) => {
            let pass=true;
            if (Object.keys(filter).length == 0) return true;
            Object.keys(filter).forEach(
                (key) => {
                    pass = pass && (data[key] == filter[key]);
                }
            );
            return pass;
        })
    }

    // useState(() => {
    //     filterAdd({"stravavisualPlace" : "Митино ФОК"});
    //     filterRemove('stravavisualPlace');
    // }, []);
    async function setAdditionalFields(dataArray) {
        //Добавляет поля stravavisualCount, stravavisualPlace, type(переводит) к массиву результатов array
        let newPlaces = [...trainingPlaces]; //Неопознанные места сначала попадают сюда
        let regexp = /^Локация (\d*)$/;
        //Определяем максимальный номер неизвестной локации Локация 345
        let newPlacesMax = newPlaces.reduce((total, curr) => {
                let placeNumber = 0;
                if (regexp.test(curr.name)) placeNumber = Number((curr.name).match(regexp)[1]); // из "Место 345" получает число 345
                return (total > placeNumber) ? total : placeNumber; 
            }, 0); 
        console.log("newPlaceCount=", newPlacesMax);


        try {
            for (let data of dataArray) {
                data.stravavisualCount = 1; // добавляем параметр число 1 к активности, чтобы потом посчитать можно было в аггрегации поэтому полю.
                let place = newPlaces.find(p => isNear(data.start_latlng, p));
                if (place) {
                    data.stravavisualPlace = place.name;
                } else if (data.start_latlng.length == 0) {
                    console.log("latlng empty: ", data);
                    data.stravavisualPlace = "Неизвестно";
                } else {
                    let address = await getAddressFromMapBox(data.start_latlng);
                    let placeAddress = formatMapBoxAddress(address);
                    if (placeAddress == '') newPlacesMax++;
                    let newPlaceName = (placeAddress != '') ? placeAddress : 'Локация ' + newPlacesMax;
                    data.stravavisualPlace = newPlaceName; //Вместо неизвестных добавляем 'Локация 1'
                    console.log("latlng: ", data.start_latlng);
                    newPlaces.push({'name': newPlaceName, 'latlng': data.start_latlng});
                }
                saveTrainingPlaces(newPlaces); //Обновляем массив зарегистрированных мест
                data.type = translateType(data.type); //Меняем вид активности на вид на русском языке
            };
        } catch (err) {
            console.log(err);
        }
       

        // dataArray.forEach(res => {
        //     res.stravavisualCount = 1; // добавляем параметр число 1 к активности, чтобы потом посчитать можно было в аггрегации поэтому полю.

        //     let place = newPlaces.find(place => isNear(res.start_latlng, place));
        //     if (place) {
        //         res.stravavisualPlace = place.name;
        //     } else {
        //         newPlacesMax++;
        //         let placeAddress = await getAddress(res.start_latlng);
        //         let newPlaceName = (placeAddress != '') ? placeAddress : 'Локация ' + newPlacesMax;
        //         res.stravavisualPlace = newPlaceName; //Вместо неизвестных добавляем 'Локация 1'
        //         newPlaces.push({'name': newPlaceName, 'latlng': res.start_latlng});
        //     }
        //     saveTrainingPlaces(newPlaces); //Обновляем массив зарегистрированных мест
        //     res.type = translateType(res.type); //Меняем вид активности на вид на русском языке
        // });
    }

    async function getData(params, accessToken) {
        //console.log("ПОЛУЧАЮ ДАННЫЕ ПО ФИЛЬТРУ");
        //Готовит параметры запроса и получает постранично данные с сервера Страва
        let per_page = 30; 
        let page = 1;
        let result = [];
        let resultChunk = [];
        setLoading(true);
        //console.log("ACTIVITIES - getData. Изменился Loading. RERENDER. loading set to true", loading);
        do {
            let addParams = {
                per_page: per_page.toString(),
                page: page.toString(),
                before: (Date.parse(queryParams.before) / 1000 + 24 * 60 *60 ).toString(),
                after: (Date.parse(queryParams.after) / 1000).toString()
            };
            let fetchparams = {...params, ...addParams};
            //console.log(fetchparams);
            resultChunk = await fetchActivitiesFromStrava(fetchparams, accessToken);
            result = [...result, ...resultChunk];
            page += 1;
        } while (
            resultChunk.length == per_page
        );


        //Добавляем поле stravavisualPlace к активности, которое идентифицирует место тренировки
        await setAdditionalFields(result);
        setLoading(false);
        //console.log("ACTIVITIES - getData. Изменился Loading. RERENDER. loading set to false", loading);
        return result;
    }

    async function fetchActivitiesFromStrava(params, accessToken) {
        //присоединяем параметры запроса к основному адресу ресурса
        let url = new URL('https://www.strava.com/api/v3/athlete/activities');
        //let params = queryParams;
        url.search = new URLSearchParams(params).toString();
        //console.log("Fetching data, Activities component");
        let data = await fetch(url, 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            }
        });
        
        let result = await data.json();
        //console.log(result);
        return result;
    }

    function defineQueryParams() {
        setFilter({}); // сбрасываем прочие фильтры кроме queryParams
        // console.log("location: ", location.search);
        let params = new URLSearchParams(location.search);
        //console.log("Define queryParams. location: ", currentLocation);
        let queryObject = Object.assign({},
            params.get('type') ? {'type': params.get('type')} : '',
            params.get("before") ? { 'before': params.get('before')} : null, 
            params.get("after") ? { 'after': params.get('after')} : null, 
            );
        // console.log(queryObject);
        //console.log("ACTIVITIES - defineQueryParams. Изменился queryParams. RERENDER. queryParams now ", queryParams); 
        setQueryParams(queryObject);
    }

    useEffect(() => {
        //console.log("useEffect 1");
        defineQueryParams();
    }, [currentLocation]);

    // При изменении фильтра загружаем активности
    useEffect(() => {
        //console.log("useEffect 2");
        if (Object.keys(queryParams).length==0) return;
        //console.log("ДАТЫ ФИЛЬТРА ИЗМЕНИЛИСЬ (ИЛИ ПРИ РЕНДЕРЕ СЮДА ЗАШЛИ), БУДУ ПОЛУЧАТЬ ДАННЫЕ И УСТАНОВЛЮ ИХ В МАССИВ. Пока ререндера нет");
        //console.log("На сейчас длина Входящих данных ", activityList.length);
        getData(queryParams, accessToken)
            .then(res => setActivityList(res))
            .catch(err => console.log(err));
    }, [queryParams.before, queryParams.after]);

    // При изменении активностей применяем к ним фильтр и загружаем в стэйт
    useEffect(() => {
        //console.log("useEffect 3");
        //Если массив пустой то тоже фильтруем потому что может быть на сервере ничего не нашли и он пустой
        //А если пропустим, то отрендерится старый массив
        //console.log("МАССИВ ДАННЫХ ИЛИ ПАРАМЕТРЫ ПОИСКА ИЗМЕНИЛИСЬ, ПРИМЕНЯЮ ФИЛЬТР. РЕРЕНДЕР");
        //console.log("queryParams", queryParams, "activityList: ", activityList);
        let filteredActivities = activityList.filter((el => queryParams.type ? (el.type == queryParams.type) : true));
        // console.log("useEffect 3: filter=", filter, filteredActivities);
        setActivities(applyFilter(filteredActivities, filter)); // Здесь ещё будет применён фильтр
    }, [activityList, queryParams, filter]);

    //console.log("Рендерю ACTIVITIES компонент.")
    return(
        <div id="activities" className="content">
            <ActivityFilter handleFormSubmit={defineQueryParams} filterParams={queryParams}/>
            {loading && <Loading />}
            {activities.length !== 0 && !loading ? <Aggregate
                activitiesList={activities}
                chartColors={chartColors}
                filter={filter}
                filterAdd={filterAdd}
                filterRemove={filterRemove}
                trainingPlaces={trainingPlaces}
                renameTrainingPlace={renameTrainingPlace}/> : null}
            {!loading && <ResultList resultList={activities} trainingPlaces={trainingPlaces} addTrainingPlace={addTrainingPlace}/>}
            {/* <button onClick={getActivitiesFromStrava}>получить данные</button> */}
        </div>
     )
}