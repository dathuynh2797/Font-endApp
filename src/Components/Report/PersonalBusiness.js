/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {LineChart} from 'react-native-charts-wrapper';
import {
  View,
  StyleSheet,
  SafeAreaView,
  processColor,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {firebaseApp} from '../config';
import {Dialog} from 'react-native-simple-dialogs';

var quarter = [
  {
    id: 1,
    name: 'Quý I',
  },
  {
    id: 2,
    name: 'Quý II',
  },
  {
    id: 3,
    name: 'Quý III',
  },
  {
    id: 4,
    name: 'Quý IV',
  },
];

export class PersonalBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelect: null,
      toggleChart: true,
      staffName: [],
      doanhSo: [],
      year: [],
      quarter: [],
      mounth: [],
      marker: {
        enabled: true,
        backgroundTint: processColor('#000'),
        markerColor: processColor('yellow'),
        textColor: processColor('#000'),
      },
      config: {
        lineWidth: 1,
        drawCubicIntensity: 0.4,
        circleRadius: 5,
        drawHighlightIndicators: false,
        color: processColor('blue'),
        drawFilled: true,
        fillColor: processColor('blue'),
        fillAlpha: 45,
        circleColor: processColor('blue'),
        textColor: processColor('cyan'),
      },
      legend: {
        enabled: true,
        textColor: processColor('red'),
        textSize: 12,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
      },
      xAxis: {
        // valueFormatter: ['Quý I', 'Quý II', 'Quý III', 'Quý IV'],
        // axisMaximum: 4,
        granularityEnabled: true,
        granularity: 1,
        axisMinimum: 0,
        textSize: 12,
        // centerAxisLabels: true,
      },
      yAxis: {
        right: {
          enabled: true,
          drawGridLines: true,
        },
        left: {
          enabled: true,
          drawGridLines: true,
        },
      },
      dataChart: [],
    };
  }

  handleSelectStaff = e => {
    const dataY = firebaseApp.firestore().collection('taxClass');
    const dataYear = [];
    const dataArrYear = [];
    dataY.onSnapshot(queryY =>
      queryY.forEach(doc => {
        if (e.id === doc.id) {
          const arr = Object.entries(doc.data());
          for (let i = 0; i < arr.length - 1; i++) {
            dataYear.push({
              id: i,
              name: arr[i][0],
            });
            dataArrYear.push({
              id: i,
              doanhSo: arr[i][1],
            });
          }
          this.setState({
            year: dataYear,
            doanhSo: dataArrYear,
            staffChartName: e.name,
          });
        }
      }),
    );
  };

  handleSelectYear = item => {
    if (item.id === this.state.doanhSo[item.id].id) {
      //   console.log(this.state.doanhSo[e.id].doanhSo);

      const arrDs = [];
      const arrYDs = [];
      const arrQDs = [];
      const arrMDs = [];
      //Lay Doanh So Cua Nv Convert To Array
      for (let [key, value] of Object.entries(
        this.state.doanhSo[item.id].doanhSo,
      )) {
        arrDs.push(value);
      }

      //Set Doanh So Vao Chart
      for (let i = 0; i < arrDs.length; i++) {
        //Set Doanh So Quy Vao Chart Khi Chon Year
        if (i < 4) {
          arrYDs.push({
            x: i,
            y: arrDs[i],
          });
        }
        //Set Doanh So Thang Vao Chart Khi Chon Quy
        else if (i >= 4 && i < 16) {
          arrQDs.push(arrDs[i]);
        }
        //Set Doanh So Tuan Vao Chart Khi Chon Thang
        else {
          arrMDs.push(arrDs[i]);
        }
      }

      this.setState({
        yearChart: arrYDs,
        quaterDoanhSo: arrQDs,
        mounthDoanhSo: arrMDs,
        quarter: quarter,
        checkSelect: 'year',
      });
      //   console.log('Nam', this.state.yearChart);
      //   console.log('Quy', this.state.quarterChart);
      //   console.log('Thang', this.state.mounthChart);
    }
  };

  checkQuarter = item => {
    const arrQ = [];
    const arrQDs = [];
    for (let [key, value] of Object.entries(this.state.quaterDoanhSo)) {
      arrQ.push(value);
    }
    // console.log(arrQ);
    switch (item) {
      case 1:
        for (let i = 0; i < 3; i++) {
          arrQDs.push({
            x: i,
            y: arrQ[i],
          });
        }
        this.setState({
          //   xAxis: {
          //     valueFormatter: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
          //     axisMaximum: 2,
          //   },
          mounth: [
            {
              id: 1,
              name: 'Tháng 1',
            },
            {
              id: 2,
              name: 'Tháng 2',
            },
            {
              id: 3,
              name: 'Tháng 3',
            },
          ],
          quarterChart: arrQDs,
          checkSelect: 'quarter',
        });
        break;

      case 2:
        for (let i = 3; i < 6; i++) {
          arrQDs.push({
            x: i - 3,
            y: arrQ[i],
          });
        }
        this.setState({
          //   xAxis: {
          //     valueFormatter: ['Tháng 4', 'Tháng 5', 'Tháng 6'],
          //     axisMaximum: 2,
          //   },
          mounth: [
            {
              id: 4,
              name: 'Tháng 4',
            },
            {
              id: 5,
              name: 'Tháng 5',
            },
            {
              id: 6,
              name: 'Tháng 6',
            },
          ],
          quarterChart: arrQDs,
          checkSelect: 'quarter',
        });
        break;

      case 3:
        for (let i = 6; i < 9; i++) {
          arrQDs.push({
            x: i - 6,
            y: arrQ[i],
          });
        }
        this.setState({
          //   xAxis: {
          //     valueFormatter: ['Tháng 7', 'Tháng 8', 'Tháng 9'],
          //     axisMaximum: 2,
          //   },
          mounth: [
            {
              id: 7,
              name: 'Tháng 7',
            },
            {
              id: 8,
              name: 'Tháng 8',
            },
            {
              id: 9,
              name: 'Tháng 9',
            },
          ],
          quarterChart: arrQDs,
          checkSelect: 'quarter',
        });
        break;

      case 4:
        for (let i = 9; i < 12; i++) {
          arrQDs.push({
            x: i - 9,
            y: arrQ[i],
          });
        }
        this.setState({
          //   xAxis: {
          //     valueFormatter: ['Tháng 1', 'Tháng 11', 'Tháng 12'],
          //     axisMaximum: 2,
          //   },
          mounth: [
            {
              id: 10,
              name: 'Tháng 10',
            },
            {
              id: 11,
              name: 'Tháng 11',
            },
            {
              id: 12,
              name: 'Tháng 12',
            },
          ],
          quarterChart: arrQDs,
          checkSelect: 'quarter',
        });
        break;

      default:
        break;
    }
  };

  handleSelectQuy = item => {
    this.checkQuarter(item.id);
  };

  handleSelectMounth = item => {
    //item.id = 1 => 12
    const arrM = [];
    const arrMDs = [];
    for (let [key, value] of Object.entries(this.state.mounthDoanhSo)) {
      arrM.push(value);
    }

    switch (item.id) {
      case 1:
        for (let i = 0; i < 5; i++) {
          arrMDs.push({
            x: i,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 2:
        for (let i = 5; i < 10; i++) {
          arrMDs.push({
            x: i - 5,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 3:
        for (let i = 10; i < 15; i++) {
          arrMDs.push({
            x: i - 10,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 4:
        for (let i = 15; i < 20; i++) {
          arrMDs.push({
            x: i - 15,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 5:
        for (let i = 20; i < 25; i++) {
          arrMDs.push({
            x: i - 20,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 6:
        for (let i = 25; i < 30; i++) {
          arrMDs.push({
            x: i - 25,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 7:
        for (let i = 30; i < 35; i++) {
          arrMDs.push({
            x: i - 30,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 8:
        for (let i = 35; i < 40; i++) {
          arrMDs.push({
            x: i - 35,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 9:
        for (let i = 40; i < 45; i++) {
          arrMDs.push({
            x: i - 40,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 10:
        for (let i = 45; i < 50; i++) {
          arrMDs.push({
            x: i - 45,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 11:
        for (let i = 50; i < 55; i++) {
          arrMDs.push({
            x: i - 50,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;
      case 12:
        for (let i = 55; i < 60; i++) {
          arrMDs.push({
            x: i - 55,
            y: arrM[i],
          });
        }
        this.setState({
          mounthChart: arrMDs,
          checkSelect: 'mounth',
        });

        break;

      default:
        break;
    }
  };

  renderAlert = () => (
    <Dialog
      visible={this.state.dialogVisible}
      title="Vui lòng nhập thông tin cần tìm kiếm"
      titleStyle={{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
      }}
      dialogStyle={{
        // borderRadius: 20,
        backgroundColor: 'rgb(255,255,255)',
      }}
      overlayStyle={{backgroundColor: 'rgba(0,0,0,.1)'}}
      onTouchOutside={() => this.setState({dialogVisible: false})}>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          borderRadius: 45,
          justifyContent: 'center',
          borderWidth: 1,
          backgroundColor: '#95c1f0',
          marginTop: 10,
          padding: 10,
        }}
        onPress={() => {
          this.setState({dialogVisible: false});
        }}>
        <Text>Xác Nhận</Text>
      </TouchableOpacity>
    </Dialog>
  );

  handleSubmit() {
    switch (this.state.checkSelect) {
      case 'year':
        this.setState({
          dataChart: this.state.yearChart,
          xAxis: {
            valueFormatter: ['Quý I', 'Quý II', 'Quý III', 'Quý IV'],
            axisMaximum: 3,
          },
          toggleChart: true,
        });
        break;
      case 'quarter':
        this.setState({
          dataChart: this.state.quarterChart,
          xAxis: {
            valueFormatter: [
              `${this.state.mounth[0].name}`,
              `${this.state.mounth[1].name}`,
              `${this.state.mounth[2].name}`,
            ],
            axisMaximum: 2,
          },
          toggleChart: true,
        });
        break;
      case 'mounth':
        this.setState({
          xAxis: {
            valueFormatter: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'],
            axisMaximum: 4,
          },
          dataChart: this.state.mounthChart,
          toggleChart: true,
        });
        break;

      default:
        this.setState({dialogVisible: true});
    }
    console.log(this.state.xAxis);
  }

  componentDidMount() {
    const data = firebaseApp.firestore().collection('user');
    const newData = [];
    data.onSnapshot(query =>
      query.forEach(doc => {
        if (
          doc.data().fullName !== null &&
          doc.data().fullName !== undefined &&
          doc.data().roles[0] !== 'Admin'
        ) {
          newData.push({
            id: doc.id,
            name: doc.data().fullName,
          });
        }
      }),
    );
    this.setState({
      staffName: newData,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={-500}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
          {this.renderAlert()}
          <View style={{flex: 1 / 3}}>
            <SearchableDropdown
              placeholder="Tên nhân viên"
              onTextChange={text => text}
              onItemSelect={item => this.handleSelectStaff(item)}
              items={this.state.staffName}
              containerStyle={{marginTop: 20, marginHorizontal: 20}}
              textInputStyle={{
                padding: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
              }}
              itemStyle={{
                padding: 10,
                marginTop: 4,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: 90,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <SearchableDropdown
                placeholder="Năm"
                onTextChange={text => text}
                onItemSelect={item => this.handleSelectYear(item)}
                items={this.state.year}
                resetValue={this.state.input}
                containerStyle={{marginTop: 20, marginLeft: 20, flex: 1 / 3}}
                textInputStyle={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 4,
                  backgroundColor: '#FAF9F8',
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemsContainerStyle={{
                  //items container style you can pass maxHeight
                  //to restrict the items dropdown hieght
                  maxHeight: 90,
                }}
              />
              <SearchableDropdown
                placeholder="Quý"
                onTextChange={text => text}
                onItemSelect={item => this.handleSelectQuy(item)}
                items={this.state.quarter}
                containerStyle={{
                  marginTop: 20,
                  marginHorizontal: 5,
                  flex: 1 / 3,
                }}
                textInputStyle={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 4,
                  backgroundColor: '#FAF9F8',
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemsContainerStyle={{
                  //items container style you can pass maxHeight
                  //to restrict the items dropdown hieght
                  maxHeight: 90,
                }}
              />
              <SearchableDropdown
                placeholder="Tháng"
                onTextChange={text => text}
                onItemSelect={item => this.handleSelectMounth(item)}
                items={this.state.mounth}
                containerStyle={{marginTop: 20, marginRight: 20, flex: 1 / 3}}
                textInputStyle={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 4,
                  backgroundColor: '#FAF9F8',
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemsContainerStyle={{
                  //items container style you can pass maxHeight
                  //to restrict the items dropdown hieght
                  maxHeight: 90,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.handleSubmit()}
              style={{
                alignItems: 'center',
                backgroundColor: '#95c1f0',
                borderWidth: 0.5,
                borderRadius: 5,
                alignSelf: 'center',
                marginVertical: 10,
                padding: 10,
              }}>
              <Text>Tìm Kiếm</Text>
            </TouchableOpacity>
          </View>
          {this.state.toggleChart ? (
            <View style={[styles.container, styles.bgChart]}>
              <LineChart
                style={styles.chart}
                marker={this.state.marker}
                xAxis={this.state.xAxis}
                // drawGridBackground={true}
                drawBorders={true}
                touchEnabled={true}
                dragEnabled={true}
                scaleEnabled={true}
                scaleXEnabled={true}
                scaleYEnabled={true}
                pinchZoom={true}
                doubleTapToZoomEnabled={true}
                dragDecelerationEnabled={true}
                dragDecelerationFrictionCoef={0.99}
                keepPositionOnRotation={false}
                legend={this.state.legend}
                data={{
                  dataSets: [
                    {
                      label:
                        'Đồ thị kết quả kinh doanh của ' +
                        `${this.state.staffChartName}`,
                      values: this.state.dataChart,
                      //   values: [
                      //     {x: 0, y: 1000},
                      //     {x: 1, y: 2000},
                      //     {x: 2, y: 3000},
                      //     {x: 3, y: 2000},
                      //     {x: 4, y: 4000},
                      //   ],
                      config: this.state.config,
                    },
                  ],
                }}
                yAxis={this.state.yAxis}
              />
            </View>
          ) : null}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
  },
  bgChart: {
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
