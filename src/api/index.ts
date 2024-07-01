import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useState } from "react";
import SalevanStore from "../store/SalevanStore";

const mock = new MockAdapter(axios, { delayResponse: 2000 });
const { getSettingsRequest, setIsLoading} = SalevanStore;

mock.onGet("/settings").reply(200, {
    "week_days": {
        "monday": {
            "start": "10:00:00",
            "end": "18:35:00",
            "is_active": true
        },
        "tuesday": {
            "start": "00:00:00",
            "end": "23:59:00",
            "is_active": false
        },
        "wednesday": {
            "start": "10:00:00",
            "end": "18:35:00",
            "is_active": true
        },
        "thursday": {
            "start": "00:00:00",
            "end": "23:59:00",
            "is_active": false
        },
        "friday": {
            "start": "10:00:00",
            "end": "18:35:00",
            "is_active": true
        },
        "saturday": {
            "start": "00:00:00",
            "end": "23:59:00",
            "is_active": false
        },
        "sunday": {
            "start": "10:00:00",
            "end": "18:35:00",
            "is_active": true
        },
    },
    "attempt": 5,
    "intensity": 2,
    "lifetime": 3,
    "running": "sleep",
    "switch":1,
    "default_queue_name": 'AAAA',
    "use_default_queue": 3,
    "ignore_company_numbers":['AAAA', 'CCCC']
});


export const GetSettings = () => {
    setIsLoading(true)
  axios
    .get("/settings")
    .then(response => {
        getSettingsRequest(response.data)
        console.log('Success');
      })
    .catch((error) => console.log(error))
    .finally(() => {setIsLoading(false)})
};

export const EditSettings = (data: object) => {
    mock.onPut("/settings", data).reply(204)
    console.log(data)
}
