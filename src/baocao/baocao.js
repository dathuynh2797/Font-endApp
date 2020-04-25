import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Title, HeaderRight, HeaderLeft} from '../Components/CustomHeader';

export class baocao extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitle: () => <Title title="Báo Cáo" />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.MenuContainer}>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SaleResultWeek');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.IconStyle}>
                <Image
                  source={require('../img/ReportIcon/saleresults.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Kết quả kinh doanh tuần</Text>
              <Image
                source={require('../img/rightArrow.png')}
                style={styles.IconMove}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Pl');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.IconStyle}>
                <Image
                  source={require('../img/ReportIcon/chart.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Đồ thị kết quả kinh doanh</Text>
              <Image
                source={require('../img/rightArrow.png')}
                style={styles.IconMove}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Bg');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.IconStyle}>
                <Image
                  source={require('../img/ReportIcon/chart2.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>So sánh kết quả kinh doanh</Text>
              <Image
                source={require('../img/rightArrow.png')}
                style={styles.IconMove}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MenuContainer: {
    flex: 1,
  },
  Col: {
    height: 70,
    margin: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#1787AB',
    justifyContent: 'center',
  },
  TabMenu: {
    flexDirection: 'row',
  },
  IconStyle: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: 'white',
  },
  IconMove: {
    height: 20,
    width: 20,
    marginTop: 10,
  },
  Icon: {
    height: 50,
    width: 50,
  },
  Text: {
    flex: 3,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 23,
    alignSelf: 'center',
    marginLeft: 30,
  },
});
