import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

import { reproduceElectionResults } from './func';

import turkeyGeoMapData from './data/tr.json';

const data = reproduceElectionResults();

type ElectionResultsMapState = {
  option: any;
  data: any;
};

function titleCase(str: string) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}
class ElectionResultsMap extends Component<any, ElectionResultsMapState> {
  state: {
    option: any;
    data: any;
  };
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
        text: 'Türkiye Seçim Sonuçları',
        subtext: 'Yerel Seçimler',
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
          let ht = `<div style="background: rgba(0, 0, 0, .9); max-width: 400px; color: #fff;border-radius: 5%; font-size: 12px;">
          <div style="padding: 5px;">
          <div style="text-align: center;margin-bottom: 5px;">${titleCase(params.data.name)}</div>`;
          params.data.results.map(
            (result: { name: any; voteRate: any; voteCount: any; icon: any }) =>
              (ht += `<div><img style="vertical-align: middle;margin-right: 5px;" width="15" src=${
                result.icon
              } />${titleCase(result.name)} ${result.voteRate}% - ${result.voteCount}</div>`),
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
        top: '5%',
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
                  color: 'rgba(	47,79,79, .2)', // 100%
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
            areaColor: '#389BB7',
            borderWidth: 0,
          },
        },
      },
      series: [
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
      <div className="examples">
        <div className="parent">
          <ReactEcharts
            option={this.state.option}
            style={{ height: '100vh', width: '100vw' }}
            className="react_for_echarts"
          />
        </div>
      </div>
    );
  }
}

export default ElectionResultsMap;
