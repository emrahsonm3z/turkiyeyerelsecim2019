import React, { Component } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

import { getElectionResults, getPartyIcon } from './func';
import { CalculatedElectionResult } from './types';

import turkeyGeoMapData from './data/tr.json';

const data = getElectionResults();

type ElectionResultsMapState = {
  option: any;
  data: any;
};

const geoCoordMap: any = {
  Manisa: [28.158319, 38.494787],
  Konya: [33.066589, 39.103627],
  Ankara: [32.055303, 39.818594],
  Eskişehir: [31.502003, 39.453424],
  Çankırı: [33.33271, 40.462331],
};

const titleCase = (str: string): string => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};
class ElectionResultsMap extends Component<{}, ElectionResultsMapState> {
  constructor(props: any) {
    super(props);
    this.registerMap();
    this.state = this.getInitialState();
  }

  registerMap = () => {
    echarts.registerMap('turkey', turkeyGeoMapData);
  };

  getInitialState = () => ({ option: this.getOption(data), data: data });

  // Büyük şehir olanların belirlenmesi
  convertData = (data: Array<CalculatedElectionResult>) => {
    let scatterData = [];

    const metropolitanDatas = data.filter(d => d.isMetropolitan === true);
    for (var i = 0; i < metropolitanDatas.length; i++) {
      var geoCoord = geoCoordMap[metropolitanDatas[i].name];
      if (geoCoord) {
        scatterData.push({
          name: metropolitanDatas[i].name,
          value: geoCoord.concat(parseInt(metropolitanDatas[i].winner.voteCount)),
          color: metropolitanDatas[i].winner.color,
        });
      }
    }
    return scatterData;
  };

  getOption = (data: any): any => {
    return {
      backgroundColor: '#404a59',
      title: {
        text: '2019 Türkiye Seçim Sonuçları',
        subtext: 'İl Bazlı Yerel Seçim Sonuçları',
        left: 'center',
        top: 10,
        x: 'center',
        textStyle: {
          color: '#fff',
        },
        subtextStyle: {
          color: '#fff',
        },
      },
      tooltip: {
        id: 1,
        trigger: 'item',
        backgroundColor: 'transparent',
        formatter: function(params: any) {
          let ht = `<div style="background: rgba(0, 0, 0, .9); max-width: 400px; color: #fff;border-radius: 5%; font-size: 16px;">
          <div style="padding: 15px;">
          <div style="text-align: center;margin-bottom: 5px;">${titleCase(params.data.name)}</div>`;
          params.data.results.map(
            (
              result: { id: number; name: any; voteRate: any; voteCount: any; icon: any },
              index: number,
            ) =>
              index < 15 && // Max 15 aday gösterilsin.
              (ht += `<div><img style="vertical-align: middle;margin-right: 5px;" width="20" src=${getPartyIcon(
                result.id,
              )} />${titleCase(result.name)} ${result.voteRate}% - ${result.voteCount}</div>`),
          );

          ht += `</div>
          </div>`;

          return ht;
        },
        // position: ['1%', '5%'],
        textStyle: {
          fontSize: '12px',
        },
      },
      toolbox: {
        show: true,
        showTitle: false,
        orient: 'horizontal',
        left: 'left',
        top: 'top',
        feature: {
          restore: {},
          saveAsImage: {},
        },
      },
      geo: {
        map: 'turkey',
        right: '10',
        top: 50,
        left: '10',
        zoom: 0.8,
        label: {
          emphasis: {
            show: false, // il isimleri
          },
        },
        roam: true,
        itemStyle: {
          normal: {
            borderColor: '#eee',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(175,238,238, 0)',
                },
                {
                  offset: 1,
                  color: 'rgba(47, 79, 79, .2)', // 100%
                },
              ],
              globalCoord: false, //
            },
            shadowColor: 'grey',
            shadowOffsetX: -1,
            shadowOffsetY: 1,
            shadowBlur: 12,
          },
          emphasis: {
            areaColor: '#404a59',
            borderWidth: 0,
          },
        },
      },
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: this.convertData(data),
          symbolSize: function(val: any) {
            return window.innerWidth / 150 + 5;
          },
          symbolOffset: ['50%', '50%'],
          showEffectOn: 'render',
          rippleEffect: {
            period: 10,
            scale: 3,
            brushType: 'fill',
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              // color: function(params: any) {
              //   // return params.data.color;
              //   return '#fff';
              // },
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'red', // color at 0% position
                  },
                  {
                    offset: 1,
                    color: 'blue', // color at 100% position
                  },
                ],
                global: false, // false by default
              },
            },
          },
          zlevel: 1,
          tooltip: {
            show: false,
          },
        },
        {
          type: 'map',
          geoIndex: 0,
          itemStyle: {
            normal: {
              borderColor: 'white',
              color: function(obj: any) {
                if (typeof obj.data === 'undefined') return '#fff';
                var color = obj.data.winner.color;

                return color;
              },
            },
          },
          data: data,
        },
      ],
    };
  };

  render() {
    return (
      <div className="parent">
        <ReactEchartsCore
          echarts={echarts}
          option={this.state.option}
          style={{ height: '100vh', width: '100vw' }}
          className="react_for_echarts"
        />
      </div>
    );
  }
}

export default ElectionResultsMap;
