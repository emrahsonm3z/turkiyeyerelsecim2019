import React, { Component } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

import { getElectionResults, getPartyIcon } from './func';

import turkeyGeoMapData from './data/tr.json';

const data = getElectionResults();

type ElectionResultsMapState = {
  option: any;
  data: any;
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
          show: true,
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff',
          emphasis: {
            show: true, // il isimleri
            fontSize: 14,
            fontWeight: 'bold',
            color: '#fff',
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
            shadowColor: '#ffec99',
            shadowOffsetX: -1,
            shadowOffsetY: 0,
            shadowBlur: 2,
          },
          emphasis: {
            areaColor: '#404a59',
            borderWidth: 0,
          },
        },
      },
      graphic: [
        {
          type: 'text',
          z: 100,
          top: '95%',
          left: 'center',
          style: {
            fill: '#fff',
            text: 'Sonuçları görmek için mouse ile harita üzerinde dolaşınız.',
            font: 'calc(.5vw + 10px) "Roboto", sans-serif',
          },
        },
      ],
      series: [
        {
          type: 'map',
          geoIndex: 0,
          itemStyle: {
            normal: {
              borderColor: 'white',
              color: function(obj: any) {
                if (typeof obj.data === 'undefined') return '#000';
                var color = obj.data.winner.color;

                return color;
              },
            },
            emphasis: {
              areaColor: '#2B91B7',
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
