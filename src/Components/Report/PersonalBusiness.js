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
import {LineChart} from 'react-native-charts-wrapper';
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

export class PersonalBusiness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Year: [],
      selectedY: false,
      selectedQ: false,
      selectedM: false,
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
        color: processColor('#0000ff'),
        drawFilled: true,
        fillColor: processColor('#0000ff'),
        fillAlpha: 45,
        circleColor: processColor('#0000ff'),
        textColor: processColor('#E0FFFF'),
      },
      legend: {
        enabled: false,
      },
      description: {
        text: '',
      },
      xAxis: {
        // valueFormatter: ['Quý I', 'Quý II', 'Quý III', 'Quý IV'],
        // axisMaximum: 4,
        granularityEnabled: true,
        granularity: 1,
        axisMinimum: 0,
        textSize: 16,
        // centerAxisLabels: true,
        position: 'BOTTOM',
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

  handleSelectGroup = item => {
    // console.log(item);
    // console.log(this.state.AllDoanhSo);
    const arrYear = [];
    let arrY = [];
    let arrD = [];

    this.state.AllDoanhSo.forEach(e => {
      if (item.Id === e.Id) {
        // console.log(e);
        arrY = Object.keys(e.DoanhSo);
        arrD = Object.values(e.DoanhSo);
        arrY.splice(arrY.length - 1);
        arrD.splice(arrD.length - 1);
      }
    });
    arrY.forEach((e, i) => {
      arrYear.push({Id: i, Name: e, Value: e});
    });
    this.setState({
      selectedY: false,
      selectedQ: false,
      selectedM: false,
      Year: arrYear,
      Quarter: [],
      Mounth: [],
      DoanhSo: arrD,
      userChart: item.Name,
      checkSelect: '',
    });
  };

  handleSelectYear = item => {
    // console.log(item);
    // console.log(this.state.DoanhSo);

    let arrData = Object.values(this.state.DoanhSo[item.Id]);
    // console.log(arrData);

    var arrYDs = [];
    var arrQDs = [];
    var arrMDs = [];

    for (let i = 0; i < arrData.length; i++) {
      //Set Doanh So Quy Vao Chart Khi Chon Year
      if (i < 4) {
        arrYDs.push({
          x: i,
          y: arrData[i],
        });
      }
      //Set Doanh So Thang Vao Chart Khi Chon Quy
      else if (i >= 4 && i < 16) {
        arrQDs.push(arrData[i]);
      }
      //Set Doanh So Tuan Vao Chart Khi Chon Thang
      else {
        arrMDs.push(arrData[i]);
      }
    }

    this.setState({
      selectedY: true,
      selectedQ: false,
      selectedM: false,
      Mounth: [],
      yearChart: arrYDs,
      doanhSoQ: arrQDs,
      doanhSoT: arrMDs,
      animation: {},
      Quarter: quarter,
      checkSelect: 'Year',
    });
  };

  checkQuarter = item => {
    // console.log(item);
    // console.log(this.state.doanhSoQ);
    // console.log(this.state.doanhSoQ[0]);
    const arrQ = this.state.doanhSoQ;
    const arrQDs = [];
    let dataChart = [];
    let Mounth = [];
    switch (item) {
      case 0:
        for (let i = 0; i < 3; i++) {
          arrQDs.push({
            x: i,
            y: arrQ[i],
          });
        }
        dataChart = arrQDs;
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
        for (let i = 3; i < 6; i++) {
          arrQDs.push({
            x: i - 3,
            y: arrQ[i],
          });
        }
        dataChart = arrQDs;
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
        for (let i = 6; i < 9; i++) {
          arrQDs.push({
            x: i - 6,
            y: arrQ[i],
          });
        }
        dataChart = arrQDs;
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
            Id: 9,
            Name: 'Tháng 9',
            Value: 'Tháng 9',
          },
        ];
        break;
      case 3:
        for (let i = 9; i < 12; i++) {
          arrQDs.push({
            x: i - 9,
            y: arrQ[i],
          });
        }
        dataChart = arrQDs;
        Mounth = [
          {
            Id: 10,
            Name: 'Tháng 10',
            Value: 'Tháng 10',
          },
          {
            Id: 11,
            Name: 'Tháng 11',
            Value: 'Tháng 11',
          },
          {
            Id: 12,
            Name: 'Tháng 12',
            Value: 'Tháng 12',
          },
        ];
        break;
      default:
        break;
    }
    this.setState({
      selectedQ: true,
      selectedM: false,
      quarterChart: dataChart,
      animation: {},
      checkSelect: 'Quarter',
      Mounth: Mounth,
    });
  };
  handleSelectQuarter = item => {
    this.checkQuarter(item.Id);
  };
  handleSelectMounth = item => {
    // console.log(item.Id);
    // console.log(this.state.doanhSoT);
    let dataChart = [];
    let arrM = this.state.doanhSoT;
    let arrMDs = [];
    switch (item.Id) {
      case 1:
        for (let i = 0; i < 5; i++) {
          arrMDs.push({
            x: i,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 2:
        for (let i = 5; i < 10; i++) {
          arrMDs.push({
            x: i - 5,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 3:
        for (let i = 10; i < 15; i++) {
          arrMDs.push({
            x: i - 10,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 4:
        for (let i = 15; i < 20; i++) {
          arrMDs.push({
            x: i - 15,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 5:
        for (let i = 20; i < 25; i++) {
          arrMDs.push({
            x: i - 20,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 6:
        for (let i = 25; i < 30; i++) {
          arrMDs.push({
            x: i - 25,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 7:
        for (let i = 30; i < 35; i++) {
          arrMDs.push({
            x: i - 30,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 8:
        for (let i = 35; i < 40; i++) {
          arrMDs.push({
            x: i - 35,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 9:
        for (let i = 40; i < 45; i++) {
          arrMDs.push({
            x: i - 40,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 10:
        for (let i = 45; i < 50; i++) {
          arrMDs.push({
            x: i - 45,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 11:
        for (let i = 50; i < 55; i++) {
          arrMDs.push({
            x: i - 50,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;
      case 12:
        for (let i = 55; i < 60; i++) {
          arrMDs.push({
            x: i - 55,
            y: arrM[i],
          });
        }
        dataChart = arrMDs;
        break;

      default:
        break;
    }

    this.setState(
      {
        selectedM: true,
        checkSelect: 'Mounth',
        mounthChart: dataChart,
        animation: {},
      },
      //   () => {
      //     console.log(this.state.mounthChart);
      //   },
    );
  };
  onBackButtonPressed() {
    // console.log('back key pressed');
  }

  handleSubmit() {
    switch (this.state.checkSelect) {
      case 'Year':
        this.setState({
          nameDecription: true,
          description: {
            text: 'Đơn Vị: Triệu VNĐ',
            textSize: 14,
          },
          animation: {
            durationY: 1500,
            easingY: 'EaseOutSine',
            // durationX: 2000,
            // easingX: 'EaseInQuad',
          },
          dataChart: this.state.yearChart,
          xAxis: {
            valueFormatter: ['Quý I', 'Quý II', 'Quý III', 'Quý IV'],
            axisMaximum: 3,
          },
        });
        break;
      case 'Quarter':
        this.setState({
          nameDecription: true,
          description: {
            text: 'Đơn Vị: Triệu VNĐ',
            textSize: 14,
          },
          animation: {
            durationY: 1500,
            easingY: 'EaseOutSine',
            // durationX: 1000,
            // easingX: 'EaseInQuad',
          },
          dataChart: this.state.quarterChart,
          xAxis: {
            valueFormatter: [
              `${this.state.Mounth[0].Name}`,
              `${this.state.Mounth[1].Name}`,
              `${this.state.Mounth[2].Name}`,
            ],
            axisMaximum: 2,
          },
        });
        break;
      case 'Mounth':
        this.setState({
          nameDecription: true,
          description: {
            text: 'Đơn Vị: Triệu VNĐ',
            textSize: 14,
          },
          animation: {
            durationY: 1500,
            easingY: 'EaseOutSine',
            // durationX: 2000,
            // easingX: 'EaseInQuad',
          },
          dataChart: this.state.mounthChart,
          xAxis: {
            valueFormatter: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'],
            axisMaximum: 4,
          },
        });
        break;
      default:
        this.setState({dialogVisible: true});
        break;
    }
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

  componentDidMount = async () => {
    var db = firebaseApp.firestore();
    var user = db.collection('user').orderBy('fullName');
    var tax = db.collection('taxClass');
    var arrUser = [];
    var arrDoanhSo = [];
    var allUserSnapShot = await user.get();
    var allTaxSnapShot = await tax.get();
    try {
      allUserSnapShot.forEach(doc => {
        if (doc.data().roles[0] !== 'Admin') {
          if (doc.data().roles[0] !== 'Giám Đốc') {
            if (doc.data().roles[0] !== 'Phó Giám Đốc') {
              arrUser.push({
                Id: doc.id,
                Name: doc.data().fullName,
                Value: doc.data().fullName,
              });
            }
          }
        }
      });
      allTaxSnapShot.forEach(doc => {
        arrDoanhSo.push({
          Id: doc.id,
          DoanhSo: doc.data(),
        });
      });
    } catch (err) {
      console.log(err);
    }
    // console.log(arrDoanhSo);

    this.setState({
      User: arrUser,
      AllDoanhSo: arrDoanhSo,
    });
  };

  render() {
    const {User, Year, Quarter, Mounth, userChart} = this.state;

    return (
      <SafeAreaView style={styles.mainContent}>
        {this.renderAlert()}
        <View style={styles.selectionContent}>
          <PickerModal
            renderSelectView={(disabled, selected, showModal) => (
              <TouchableOpacity
                onPress={() => showModal()}
                style={[
                  SelectBoxStyle.pressBtn,
                  selectViewIsDisabled && SelectBoxStyle.disabledBtn,
                ]}>
                <View style={SelectBoxStyle.container}>
                  <Text
                    style={[
                      selectViewIsDisabled
                        ? SelectBoxStyle.disabledTxt
                        : SelectBoxStyle.chooseText,
                    ]}>
                    {selected && selected.Name
                      ? selected.Name
                      : 'Chọn Nhân Viên'}
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
            onSelected={this.handleSelectGroup.bind(this)}
            onBackButtonPressed={this.onBackButtonPressed.bind(this)}
            items={User}
            sortingLanguage={'vn'}
            showToTopButton={true}
            showAlphabeticalIndex={true}
            autoGenerateAlphabeticalIndex={true}
            selectPlaceholderText={'Chọn Nhân Viên'}
            // onEndReached={() => {}}
            searchPlaceholderText={'Tìm kiếm...'}
            requireSelection={true}
            autoSort={true}
          />
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
              <Text
                style={styles.txtDes}>{`Đồ thị doanh số ${userChart}`}</Text>
            </View>
          )}
          <LineChart
            style={styles.chart}
            marker={this.state.marker}
            legend={this.state.legend}
            xAxis={this.state.xAxis}
            animation={this.state.animation}
            gridBackgroundColor={processColor('#ffffff')}
            drawBarShadow={false}
            drawValueAboveBar={true}
            chartDescription={this.state.description}
            drawHighlightArrow={true}
            data={{
              dataSets: [
                {
                  label: 'Đồ thị kết quả kinh doanh của ' + `${userChart}`,
                  values: this.state.dataChart,
                  config: this.state.config,
                },
              ],
            }}
            yAxis={this.state.yAxis}
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
    // backgroundColor: 'red',
  },
  selection: {
    width: '30%',
  },
  btnStaff: {
    //   alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: 'yellow',
  },
  containerChart: {
    flex: 1 / 2,
    marginBottom: 10,
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
