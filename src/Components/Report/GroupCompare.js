/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  processColor,
  Image,
} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import PickerModal from 'react-native-picker-modal-view';
import {Dialog} from 'react-native-simple-dialogs';
import {
  SelectBoxStyle,
  selectViewIsDisabled,
} from 'react-native-picker-modal-view/dist/Assets/Styles';
import {firebaseApp} from '../config';
const quarter = [
  {
    Id: 0,
    Name: 'Quý 1',
    Value: 'Quý 1',
  },
  {
    Id: 1,
    Name: 'Quý 2',
    Value: 'Quý 2',
  },
  {
    Id: 2,
    Name: 'Quý 3',
    Value: 'Quý 3',
  },
  {
    Id: 3,
    Name: 'Quý 4',
    Value: 'Quý 4',
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
export class GroupCompare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Year: [],
      selectedT: false,
      selectedY: false,
      selectedQ: false,
      selectedM: false,
      nameDecription: false,
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
      legend: {
        enabled: true,
        textSize: 16,
        wordWrapEnabled: true,
      },
      description: {
        text: '',
      },
      marker: {
        enabled: true,
        markerColor: processColor('yellow'),
        textColor: processColor('#000'),
        markerFontSize: 14,
      },
    };
  }

  handleSelectYear = item => {
    const doanhSoQuy = [];
    const doanhSoThang = [];
    const doanhSoTuan = [];
    const dataQ = [];
    console.log(item);

    for (let i = 0; i < this.state.doanhSo.length; i++) {
      doanhSoQuy.push([
        Object.values(this.state.doanhSo[i][item.Id])
          .slice(0, 4)
          .reduce((a, b) => a + b),
      ]);
      doanhSoThang.push(
        Object.values(this.state.doanhSo[i][item.Id]).slice(4, 16),
      );
      doanhSoTuan.push(Object.values(this.state.doanhSo[i][item.Id]).slice(16));
    }
    // // console.log('Doanh So Q', doanhSoQuy);
    // console.log('Doanh So Thang', doanhSoThang);
    // // console.log('Doanh So Tuan', doanhSoTuan);
    for (let i = 0; i < doanhSoQuy.length; i++) {
      dataQ.push({
        values: doanhSoQuy[i],
        label: this.state.groupName[i].Name,
        config: {
          drawValues: false,
          colors: [processColor(COLOR[i])],
        },
      });
    }
    this.setState({
      selectedY: true,
      selectedQ: false,
      selectedM: false,
      Mounth: [],
      Quarter: quarter,
      yearChart: dataQ,
      doanhSoThang: doanhSoThang,
      doanhSoTuan: doanhSoTuan,
      animation: {},
      checkSelect: 'Year',
    });
  };

  checkQuarter = item => {
    const doanhSoT = [];
    const dataT = [];
    let Mounth = [];
    // console.log('state', this.state.doanhSoThang);
    // console.log(item);

    for (let i = 0; i < this.state.doanhSoThang.length; i++) {
      switch (item) {
        case 0:
          doanhSoT.push([
            this.state.doanhSoThang[i].slice(0, 3).reduce((a, b) => a + b),
          ]);
          dataT.push({
            values: doanhSoT[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          Mounth = [
            {
              Id: 1,
              Name: 'Tháng 1',
              Value: 'Tháng 1',
            },
            {
              Id: 2,
              Name: 'Tháng 2',
              Value: 'Tháng 2',
            },
            {
              Id: 3,
              Name: 'Tháng 3',
              Value: 'Tháng 3',
            },
          ];
          break;
        case 1:
          doanhSoT.push([
            this.state.doanhSoThang[i].slice(3, 6).reduce((a, b) => a + b),
          ]);
          dataT.push({
            values: doanhSoT[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          Mounth = [
            {
              Id: 4,
              Name: 'Tháng 4',
              Value: 'Tháng 4',
            },
            {
              Id: 5,
              Name: 'Tháng 5',
              Value: 'Tháng 5',
            },
            {
              Id: 6,
              Name: 'Tháng 6',
              Value: 'Tháng 6',
            },
          ];
          break;
        case 2:
          doanhSoT.push([
            this.state.doanhSoThang[i].slice(6, 9).reduce((a, b) => a + b),
          ]);
          dataT.push({
            values: doanhSoT[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          Mounth = [
            {
              Id: 7,
              Name: 'Tháng 7',
              Value: 'Tháng 7',
            },
            {
              Id: 8,
              Name: 'Tháng 8',
              Value: 'Tháng 8',
            },
            {
              Id: 8,
              Name: 'Tháng 8',
              Value: 'Tháng 8',
            },
          ];
          break;
        case 3:
          doanhSoT.push([
            this.state.doanhSoThang[i].slice(9, 12).reduce((a, b) => a + b),
          ]);
          dataT.push({
            values: doanhSoT[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          Mounth = [
            {
              Id: 10,
              Name: 'Tháng 10',
              Value: 'Tháng 10',
            },
            {
              Id: 8,
              Name: 'Tháng 11',
              Value: 'Tháng 11',
            },
            {
              Id: 8,
              Name: 'Tháng 12',
              Value: 'Tháng 12',
            },
          ];
          break;
      }
    }
    this.setState({
      selectedQ: true,
      animation: {},
      Mounth: Mounth,
      quarterChart: dataT,
      checkSelect: 'Quarter',
    });
  };
  handleSelectQuarter = item => {
    this.checkQuarter(item.Id);
  };
  handleSelectMounth = item => {
    const doanhSoW = [];
    const dataW = [];
    for (let i = 0; i < this.state.doanhSoTuan.length; i++) {
      switch (item.Id) {
        case 1:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(0, 5).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 2:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(5, 10).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 3:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(10, 15).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 4:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(15, 20).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 5:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(20, 25).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 6:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(25, 30).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 7:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(30, 35).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 8:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(35, 40).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 9:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(40, 45).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 10:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(45, 50).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 11:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(50, 55).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
        case 12:
          doanhSoW.push([
            this.state.doanhSoTuan[i].slice(55, 60).reduce((a, b) => a + b),
          ]);
          //   console.log(doanhSoW);
          dataW.push({
            values: doanhSoW[i],
            label: this.state.groupName[i].Name,
            config: {
              drawValues: false,
              colors: [processColor(COLOR[i])],
            },
          });
          break;
      }
    }
    this.setState({
      selectedM: true,
      mounthChart: dataW,
      animation: {},
      checkSelect: 'Mounth',
    });
  };
  onBackButtonPressed() {
    // console.log('back key pressed');
  }

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
      case 'Year':
        this.setState({
          title: 'Tổng Doanh Số Quý Trong Năm',
          description: {
            text: 'Đơn Vị: Triệu VNĐ',
            textSize: 14,
          },
          nameDecription: true,
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
        });
        break;
      case 'Quarter':
        this.setState({
          title: 'Tổng Doanh Số Tháng Trong Quý',
          nameDecription: true,
          animation: {
            durationY: 1500,
            durationX: 1500,
            easingX: 'EaseOutSine',
            easingY: 'EaseOutSine',
          },
          description: {
            text: 'Đơn Vị: Triệu VNĐ',
            textSize: 14,
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
        });
        break;
      case 'Mounth':
        this.setState({
          title: 'Tổng Doanh Số Tuần Trong Tháng',
          description: {
            text: 'Đơn Vị: Triệu VNĐ',
            textSize: 14,
          },
          nameDecription: true,
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
        });
        break;
      default:
        this.setState({dialogVisible: true}, () => {});
    }
  }

  componentDidMount = async () => {
    const db = firebaseApp.firestore();
    const unitsData = [];
    const arrYear = [];
    const arrY = [];
    const arrDoanhSo = [];

    // console.log('start');
    var units = db.collection('units');
    try {
      var allUnitsSnapShot = await units.get();
      allUnitsSnapShot.forEach(doc => {
        if (doc.data().unitsTitle !== 'Ban Giám Đốc') {
          unitsData.push({
            Id: doc.id,
            Name: doc.data().unitsTitle,
            Value: doc.data().unitsTitle,
            data: doc.data(),
          });
        }
      });

      // console.log('end');
    } catch (err) {
      console.log('Error getting documents', err);
    }

    // console.log(unitsData);

    unitsData.forEach(e => {
      arrYear.push(
        Object.keys(e.data).slice(0, Object.values(e.data).length - 80),
      );
      arrDoanhSo.push(
        Object.values(e.data).slice(0, Object.values(e.data).length - 80),
      );
    });
    // console.log(arrYear);
    // console.log(arrDoanhSo);

    arrYear[0].forEach((e, i) => {
      arrY.push({Id: i, Name: e, Value: e});
    });
    // console.log(arrY);

    this.setState({
      groupName: unitsData,
      Year: arrY,
      doanhSo: arrDoanhSo,
    });
  };

  render() {
    const {Year, Quarter, Mounth, title} = this.state;

    return (
      <SafeAreaView style={styles.mainContent}>
        {this.renderAlert()}
        <View style={styles.selectionContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              //   backgroundColor: 'red',
            }}>
            <View style={styles.selection}>
              <PickerModal
                renderSelectView={(disabled, selected, showModal) => (
                  <TouchableOpacity
                    disabled={disabled}
                    onPress={() => showModal()}
                    style={[
                      SelectBoxStyle.pressBtn,
                      disabled && SelectBoxStyle.disabledBtn,
                    ]}>
                    <View style={SelectBoxStyle.container}>
                      <Text
                        style={[
                          disabled
                            ? SelectBoxStyle.disabledTxt
                            : SelectBoxStyle.chooseText,
                        ]}>
                        {this.state.selectedY ? selected.Name : 'Chọn Năm'}
                      </Text>
                      <Image
                        source={require('../../img/downArrow.png')}
                        style={[
                          SelectBoxStyle.downBtn,
                          selectViewIsDisabled && SelectBoxStyle.disabledImage,
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                selectPlaceholderText="Chọn Năm"
                items={Year}
                onSelected={this.handleSelectYear.bind(this)}
                onEndReached={() =>
                  this.setState({
                    animation: {},
                  })
                }
                onBackButtonPressed={this.onBackButtonPressed.bind(this)}
                showToTopButton={true}
                searchPlaceholderText={'Tìm kiếm năm...'}
                requireSelection={true}
              />
            </View>
            <View style={[styles.selection, {marginHorizontal: 10}]}>
              <PickerModal
                renderSelectView={(disabled, selected, showModal) => (
                  <TouchableOpacity
                    disabled={disabled}
                    onPress={() => showModal()}
                    style={[
                      SelectBoxStyle.pressBtn,
                      disabled && SelectBoxStyle.disabledBtn,
                    ]}>
                    <View style={SelectBoxStyle.container}>
                      <Text
                        style={[
                          disabled
                            ? SelectBoxStyle.disabledTxt
                            : SelectBoxStyle.chooseText,
                        ]}>
                        {this.state.selectedQ ? selected.Name : 'Chọn Quý'}
                      </Text>
                      <Image
                        source={require('../../img/downArrow.png')}
                        style={[
                          SelectBoxStyle.downBtn,
                          selectViewIsDisabled && SelectBoxStyle.disabledImage,
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                selectPlaceholderText={'Chọn Quý'}
                items={Quarter}
                onSelected={this.handleSelectQuarter.bind(this)}
                onEndReached={() =>
                  this.setState({
                    animation: {},
                  })
                }
                onBackButtonPressed={this.onBackButtonPressed.bind(this)}
                showToTopButton={true}
                searchPlaceholderText={'Tìm kiếm quý...'}
                requireSelection={true}
              />
            </View>
            <View style={{width: '33%'}}>
              <PickerModal
                renderSelectView={(disabled, selected, showModal) => (
                  <TouchableOpacity
                    disabled={disabled}
                    onPress={() => showModal()}
                    style={[
                      SelectBoxStyle.pressBtn,
                      disabled && SelectBoxStyle.disabledBtn,
                    ]}>
                    <View style={SelectBoxStyle.container}>
                      <Text
                        style={[
                          disabled
                            ? SelectBoxStyle.disabledTxt
                            : SelectBoxStyle.chooseText,
                        ]}>
                        {this.state.selectedM ? selected.Name : 'Chọn Tháng'}
                      </Text>
                      <Image
                        source={require('../../img/downArrow.png')}
                        style={[
                          SelectBoxStyle.downBtn,
                          selectViewIsDisabled && SelectBoxStyle.disabledImage,
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                modalAnimationType={'slide'}
                selectPlaceholderText={'Chọn Tháng'}
                items={Mounth}
                onSelected={this.handleSelectMounth.bind(this)}
                onBackButtonPressed={this.onBackButtonPressed.bind(this)}
                showToTopButton={true}
                searchPlaceholderText={'Tìm kiếm tháng...'}
                requireSelection={true}
              />
            </View>
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

        <View style={[styles.containerChart, styles.bgChart]}>
          {this.state.nameDecription && (
            <View style={styles.description}>
              <Text style={styles.txtDes}>{`${title}`}</Text>
            </View>
          )}
          <BarChart
            animation={this.state.animation}
            style={styles.chart}
            xAxis={this.state.xAxis}
            data={this.state.data}
            chartDescription={this.state.description}
            legend={this.state.legend}
            drawValueAboveBar={false}
            marker={this.state.marker}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
  selectionContent: {
    flex: 1 / 3,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: -20,
    // backgroundColor: 'red',
  },
  selection: {
    width: '30%',
  },
  containerChart: {
    flex: 1 / 2,
  },
  bgChart: {
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
  description: {alignItems: 'center'},
  txtDes: {
    fontSize: 18,
    color: 'red',
  },
});
