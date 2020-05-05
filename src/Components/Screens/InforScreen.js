import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from 'react-native';

export class InforScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.MenuContainer}>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Policy');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/policy.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Chính sách công ty</Text>
              <Image
                source={require('../../img/rightArrow.png')}
                style={styles.Iconmove}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Personel');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/personnel.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Nhân sự</Text>
              <Image
                source={require('../../img/rightArrow.png')}
                style={styles.Iconmove}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Ogchart');
            }}
            style={styles.TabMenu}>
            {/* <View style={styles.TabMenu}> */}
            <View style={styles.Iconstyle}>
              <Image
                source={require('../../img/Inforicon/ogchart.png')}
                style={styles.Icon}
              />
            </View>
            <Text style={styles.Text}>Sơ đồ tổ chức</Text>
            <Image
              source={require('../../img/rightArrow.png')}
              style={styles.Iconmove}
            />
            {/* </View> */}
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
  Iconstyle: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: 'white',
  },
  Iconmove: {
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
