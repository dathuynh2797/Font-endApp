/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {BarChart} from 'react-native-charts-wrapper';
import {DismissKeyboardView} from '../DismissKeyBroad';
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

const COLOR = [
  '#c7004c',
  '#8f71ff',
  '#A0522D',
  '#00bd56',
  '#f9fd50',
  '#3d6cb9',
  '#40E0D0',
  '#FF6347',
  '#778899',
  '#FFB6C1',
];

export class TeamCompare extends Component {
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
      data: {
        // dataSets: [],
        config: {
          barWidth: 0.5,
          group: {
            fromX: 0,
            groupSpace: 0,
            barSpace: 0.1,
          },
        },
      },
      xAxis: {
        valueFormatter: [],
        granularityEnabled: true,
        // granularityEnabled: true,
        granularity: 1,
        axisMaximum: 5,
        axisMinimum: 0,
        // centerAxisLabels: true,
        position: 'BOTTOM',
      },

      marker: {
        enabled: true,
        markerColor: processColor('yellow'),
        textColor: processColor('#000'),
        markerFontSize: 14,
      },
    };
  }

  handleSelectGroup = item => {
    // console.log(item);

    const arrTeam = [];
    const arrYear = [];
    const arrDoanhSo = [];
    const arrY = [];
    // // const dataTeam = firebaseApp.firestore().collection('stall');
    // // dataTeam.onSnapshot(query => {
    this.state.stallData.forEach(e => {
      for (let i = 0; i < this.state.listTeam[item.idI].list.length; i++) {
        //ss doc.id === list[] ? push
        if (e.id === this.state.listTeam[item.idI].list[i]) {
          arrTeam.push({
            id: e.id,
            name: e.name,
            doanhSo: e.doanhSo,
          });
        }
      }
    });

    // console.log('mang Team', arrTeam);

    for (let i = 0; i < arrTeam.length; i++) {
      arrYear.push(
        Object.keys(arrTeam[i].doanhSo).slice(
          0,
          Object.keys(arrTeam[i].doanhSo).length - 79,
        ),
      );
      arrDoanhSo.push(
        Object.values(arrTeam[i].doanhSo).slice(
          0,
          Object.values(arrTeam[i].doanhSo).length - 2,
        ),
      );
    }
    // console.log(arrY);

    arrYear[0].forEach((e, i) => {
      arrY.push({id: i, name: e});
    });

    this.setState({year: arrY, doanhSo: arrDoanhSo, team: arrTeam});
  };

  handleSelectYear = item => {
    // console.log('Doanh So', this.state.doanhSo);
    // console.log('default', this.state.data);
    // console.log(item);

    const doanhSoQuy = [];
    const doanhSoThang = [];
    const doanhSoTuan = [];
    const dataQ = [];
    for (let i = 0; i < this.state.doanhSo.length; i++) {
      doanhSoQuy.push([
        Object.values(this.state.doanhSo[i][item.id])
          .slice(0, 4)
          .reduce((a, b) => a + b),
      ]);
      doanhSoThang.push(
        Object.values(this.state.doanhSo[i][item.id]).slice(4, 16),
      );
      doanhSoTuan.push(Object.values(this.state.doanhSo[i][item.id]).slice(16));
    }
    // console.log('Doanh So Q', doanhSoQuy);
    // console.log('Doanh So Thang', doanhSoThang);
    // console.log('Doanh So Tuan', doanhSoTuan);

    for (let i = 0; i < doanhSoQuy.length; i++) {
      dataQ.push({
        values: doanhSoQuy[i],
        label: this.state.team[i].name,
        config: {
          drawValues: false,
          colors: [processColor(COLOR[i])],
        },
      });
    }
    this.setState({
      yearChart: dataQ,
      checkSelect: 'year',
      quarter: quarter,
      doanhSoThang: doanhSoThang,
      doanhSoTuan: doanhSoTuan,
      animation: {},
    });

    // console.log('Doanh so quy', doanhSoQuy);
  };

  checkQuarter = item => {
    // const arrQ = [];
    const doanhSoT = [];
    const dataT = [];
    // console.log(item);
    // console.log(this.state.doanhSoThang[0][0]);
    // const data = this.state.doanhSoThang;
    // console.log(typeof data);

    for (let i = 0; i < this.state.doanhSoThang.length; i++) {
      switch (item) {
        case 1:
          doanhSoT.push([
            this.state.doanhSoThang[i].slice(0, 3).reduce((a, b) => a + b),
          ]);
          dataT.push({
            values: doanhSoT[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            animation: {},
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
            quarterChart: dataT,
            checkSelect: 'quarter',
          });
          break;
        case 2:
          doanhSoT.push([
            this.state.doanhSoThang[i].slice(3, 6).reduce((a, b) => a + b),
          ]);
          dataT.push({
            values: doanhSoT[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            animation: {},
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
            quarterChart: dataT,
            checkSelect: 'quarter',
          });
          break;
        case 3:
          doanhSoT.push([
            this.state.doanhSoThang[i].slice(6, 9).reduce((a, b) => a + b),
          ]);
          dataT.push({
            values: doanhSoT[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            animation: {},
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
            quarterChart: dataT,
            checkSelect: 'quarter',
          });
          break;
        case 4:
          doanhSoT.push([
            this.state.doanhSoThang[i].slice(9, 12).reduce((a, b) => a + b),
          ]);
          dataT.push({
            values: doanhSoT[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            animation: {},
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
            quarterChart: dataT,
            checkSelect: 'quarter',
          });
          break;

        default:
          break;
      }
    }
    // console.log(doanhSoT);
    // console.log(dataT);
  };

  handleSelectQuy = item => {
    this.checkQuarter(item.id);
  };

  handleSelectMounth = item => {
    // console.log(item);
    const doanhSoW = [];
    const dataW = [];
    for (let i = 0; i < this.state.doanhSoTuan.length; i++) {
      switch (item.id) {
        case 1:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(0, 5).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 2:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(5, 10).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 3:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(10, 15).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 4:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(15, 20).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 5:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(20, 25).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 6:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(25, 30).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 7:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(30, 35).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 8:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(35, 40).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 9:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(40, 45).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 10:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(45, 50).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 11:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(50, 55).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;
        case 12:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(55, 60).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);

          dataW.push({
            values: doanhSoW[i],
            label: this.state.team[i].name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          this.setState({
            mounthChart: dataW,
            animation: {},
            checkSelect: 'mounth',
          });
          break;

        default:
          break;
      }
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
        this.setState(
          {
            animation: {
              durationY: 1500,
              durationX: 1500,
              easingX: 'EaseOutSine',
              easingY: 'EaseOutSine',
            },
            data: {
              dataSets: this.state.yearChart,
              config: {
                barWidth: 0.5,
                group: {
                  fromX: 0,
                  groupSpace: 0,
                  barSpace: 0.1,
                },
              },
            },
            toggleChart: true,
            title: 'Tổng Doanh Số Quý Trong Năm',
          },
          //   () => {
          //     console.log(this.state.data);
          //   },
        );
        break;
      case 'quarter':
        this.setState(
          {
            animation: {
              durationY: 1500,
              durationX: 1500,
              easingX: 'EaseOutSine',
              easingY: 'EaseOutSine',
            },
            data: {
              dataSets: this.state.quarterChart,
              config: {
                barWidth: 0.5,
                group: {
                  fromX: 0,
                  groupSpace: 0,
                  barSpace: 0.1,
                },
              },
            },
            toggleChart: true,
            title: 'Tổng Doanh Số Tháng Trong Quý',
          },
          //   () => {
          //     console.log(this.state.data);
          //   },
        );
        break;
      case 'mounth':
        this.setState(
          {
            animation: {
              durationY: 1500,
              durationX: 1500,
              easingX: 'EaseOutSine',
              easingY: 'EaseOutSine',
            },
            data: {
              dataSets: this.state.mounthChart,
              config: {
                barWidth: 0.5,
                group: {
                  fromX: 0,
                  groupSpace: 0,
                  barSpace: 0.1,
                },
              },
            },
            toggleChart: true,
            title: 'Tổng Doanh Số Tuần Trong Tháng',
          },
          //   () => {
          //     console.log(this.state.data);
          //   },
        );
        break;

      default:
        this.setState({dialogVisible: true}, () => {});
    }
  }

  componentDidMount = async () => {
    const db = firebaseApp.firestore();
    const unitsData = [];
    const listTeam = [];
    const stallData = [];

    // console.log('start');
    var units = db.collection('units');
    var stall = db.collection('stall');
    try {
      var allStallSnapshot = await stall.get();
      var allUnitsSnapShot = await units.get();
      let index = -1;
      allUnitsSnapShot.forEach(doc => {
        if (doc.data().unitsTitle !== 'Ban Giám Đốc') {
          index++;
          unitsData.push({
            id: doc.id,
            name: doc.data().unitsTitle,
            idI: index,
          });
          listTeam.push({list: doc.data().productStall});
        }
      });
      allStallSnapshot.forEach(doc => {
        if (doc.data().teamName !== 'Nhóm Giám Đốc') {
          stallData.push({
            id: doc.id,
            name: doc.data().teamName,
            doanhSo: doc.data(),
          });
        }
      });
      //   console.log('end');
    } catch (err) {
      console.log('Error getting documents', err);
    }
    // console.log('units', unitsData);
    // console.log('stall', stallData);
    // console.log('list', listTeam);
    // console.log('end comp');
    this.setState({
      groupName: unitsData,
      listTeam: listTeam,
      stallData: stallData,
    });
    // );
  };

  render() {
    return (
      <DismissKeyboardView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{flex: 1}}>
          <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
            {this.renderAlert()}
            <View style={{flex: 1 / 3}}>
              <SearchableDropdown
                placeholder="Nhập Phòng"
                onTextChange={text => text}
                onItemSelect={item => this.handleSelectGroup(item)}
                items={this.state.groupName}
                containerStyle={{marginTop: 20, marginHorizontal: 20}}
                textInputStyle={{
                  padding: 10,
                  borderWidth: 0.7,
                  borderColor: '#000',
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
                  placeholder="Nhập Năm"
                  onTextChange={text => text}
                  onItemSelect={item => this.handleSelectYear(item)}
                  items={this.state.year}
                  containerStyle={{marginTop: 20, marginLeft: 20, flex: 1 / 3}}
                  textInputStyle={{
                    padding: 10,
                    borderWidth: 0.7,
                    borderColor: '#000',
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
                  placeholder="Nhập Quý"
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
                    borderWidth: 0.7,
                    borderColor: '#000',
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
                  placeholder="Nhập Tháng"
                  onTextChange={text => text}
                  onItemSelect={item => this.handleSelectMounth(item)}
                  items={this.state.mounth}
                  containerStyle={{marginTop: 20, marginRight: 20, flex: 1 / 3}}
                  textInputStyle={{
                    padding: 10,
                    borderWidth: 0.7,
                    borderColor: '#000',
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

            <View style={[styles.container, styles.bgChart]}>
              <View>
                <Text>{this.state.title}</Text>
              </View>
              <BarChart
                animation={this.state.animation}
                style={styles.chart}
                xAxis={this.state.xAxis}
                data={this.state.data}
                legend={this.state.legend}
                drawValueAboveBar={false}
                marker={this.state.marker}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </DismissKeyboardView>
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
