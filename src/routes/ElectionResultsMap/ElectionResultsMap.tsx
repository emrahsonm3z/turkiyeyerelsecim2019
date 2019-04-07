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

const capitalize = function(text: string) {
  return text.replace(/^\w/, c => c.toUpperCase());
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
          let ht = `<div style="background: rgba(0, 0, 0, .9); max-width: 400px; color: #fff;border-radius: 5%;">
          <div style="padding: 15px;">
          <div>${titleCase(params.data.name)}</div>`;
          params.data.results.map(
            (result: { name: any; voteRate: any; voteCount: any }) =>
              (ht += `<div>${titleCase(result.name)} ${result.voteRate}% - ${
                result.voteCount
              }</div>`),
          );

          ht += `</div>
          </div>`;

          return ht;
        },
        textStyle: {
          fontSize: '16px',
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
        top: '13%',
        left: '10',
        // center: [31.502003, 39.453424],
        // // zoom: 2,
        zoom: 0.8,
        label: {
          emphasis: {
            show: false, // il isimleri
          },
        },
        roam: true,
        // itemStyle: {
        //   normal: {
        //     areaColor: "#323c48",
        //     borderColor: "#111"
        //   },
        //   emphasis: {
        //     areaColor: "#2a333d"
        //   }
        // }
        itemStyle: {
          normal: {
            //         	color: '#ddd',
            // borderColor: 'rgba(147, 235, 248, 1)',
            // borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(175,238,238, 0)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(	47,79,79, .2)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            // shadowColor: 'rgba(128, 217, 248, 1)',
            // // shadowColor: 'rgba(255, 255, 255, 1)',
            // shadowOffsetX: -2,
            // shadowOffsetY: 2,
            // shadowBlur: 10,
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
            style={{ height: '700px', width: '100%' }}
            className="react_for_echarts"
          />
        </div>
      </div>
    );
  }
}

export default ElectionResultsMap;
