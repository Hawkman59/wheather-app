import React, { useState, useEffect } from 'react';
import ApiHandler from '../app/apiHandler';
import { ActivityIndicator, Card, Paragraph } from 'react-native-paper';
import WeatherToday from './wheatherToday';

const WeatherInfo = (props) => {
  const [data, setData] = useState(null);

  useEffect(async () => {
    if(props != null && props.location != null && data == null){
      var tmp = await ApiHandler.getWeatherDataForCoordinates(props.location.latitude,props.location.longitude)
      setData(tmp)
    }
  }, [props]);
 

  return (
    <React.Fragment>
      {data == null && 
        <ActivityIndicator animating={true} />
      }

      {(data != null && data.current != null)  && 
        <WeatherToday data={data}></WeatherToday>
      }

      {(data != null && data.cod != 200) && 
        <Paragraph>{data.message}</Paragraph>
      }
    </React.Fragment>
  );
}

export default WeatherInfo;