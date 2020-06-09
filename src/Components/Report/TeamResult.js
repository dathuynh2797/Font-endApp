import React, {Component} from 'react';
import {StyleSheet, Text, View, processColor, SafeAreaView} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

export class TeamResult extends Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: [5, 40, 77, 81, 43],
            label: 'Company A',
            config: {
              drawValues: false,
              colors: [processColor('red')],
            },
          },
          {
            values: [40, 5, 50, 23, 79],
            label: 'Company B',
            config: {
              drawValues: false,
              colors: [processColor('blue')],
            },
          },
          {
            values: [10, 55, 35, 90, 82],
            label: 'Company C',
            config: {
              drawValues: false,
              colors: [processColor('green')],
            },
          },
          {
            values: [10, 55, 35, 90, 82],
            label: 'Company D',
            config: {
              drawValues: false,
              colors: [processColor('#64c3e8')],
            },
          },
        ],
        config: {
          barWidth: 0.2,
          group: {
            fromX: 0,
            groupSpace: 0.1,
            barSpace: 0,
          },
        },
      },
      xAxis: {
        valueFormatter: ['1990', '1991', '1992', '1993', '1994'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 5,
        axisMinimum: 0,
        centerAxisLabels: true,
      },

      marker: {
        enabled: true,
        markerColor: processColor('yellow'),
        textColor: processColor('#000'),
        markerFontSize: 14,
      },
    };
  }

  componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({...this.state, highlights: [{x: 1, y: 40}, {x: 2, y: 50}]});
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1 / 2}}>
          {/* <View style={{height: 80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View> */}

          <View style={styles.container}>
            <BarChart
              style={styles.chart}
              xAxis={this.state.xAxis}
              data={this.state.data}
              legend={this.state.legend}
              drawValueAboveBar={false}
              drawGridBackground={true}
              scaleXEnabled={true}
              dragEnabled={true}
              dragDecelerationEnabled={true}
              // onSelect={this.handleSelect.bind(this)}
              // onChange={event => console.log(event.nativeEvent)}
              //   highlights={this.state.highlights}
              marker={this.state.marker}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
