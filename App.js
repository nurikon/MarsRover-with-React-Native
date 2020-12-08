import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, TextInput } from 'react-native';


const App = () => {

  const [response, setResponse] = useState();
  const [sizeX, setSizeX] = useState();
  const [sizeY, setSizeY] = useState();
  const [firstX, setFirstX] = useState();
  const [firstY, setFirstY] = useState();
  const [firstD, setFirstD] = useState();
  const [directives, setDirectives] = useState();

  const calculate = () => {
    if (sizeX && sizeY && firstX && firstY && firstD && directives) {
      if (firstD === 'W' || firstD === 'S' || firstD === 'N' || firstD === 'E') {
        const first_degree = firstDegree()
        const resDirective = makeDirectives(first_degree)
        const direction = degreeToLetter(resDirective.degree)
        setResponse({ direction: direction, x: resDirective.x, y: resDirective.y })
      } else {
        Alert.alert('', 'You entered the wrong direction! Only E, W, S, N!', [{ text: 'OK' }])
      }
    } else {
      Alert.alert('', 'fill in the blanks!', [{ text: 'OK' }]);
    }
  }

  const firstDegree = () => {
    let val
    switch (firstD) {
      case 'E': { val = 0; }
        break;
      case 'N': { val = 90; }
        break;
      case 'W': { val = 180; }
        break;
      case 'S': { val = 270; }
        break;
    }
    return val
  }

  const makeDirectives = (first_degree) => {
    let degree = first_degree
    let x = Number(firstX)
    let y = Number(firstY)

    for (var i = 0; i < directives.length; i++) {
      if (directives[i] === 'L' || directives[i] === 'R' || directives[i] === 'M') {
        if (x > sizeX || y > sizeY || x < 0 || y < 0) {
          Alert.alert('', 'you came out of the plateau!', [{ text: 'OK' }]);
          break;
        } else {
          switch (directives[i]) {
            case 'L': degree += 90
              break;
            case 'R': degree -= 90
              break;
            case 'M': {
              const deg = degreeToLetter(degree)
              switch (deg) {
                case 'E': { x++ }
                  break;
                case 'N': { y++ }
                  break;
                case 'W': { x-- }
                  break;
                case 'S': { y-- }
                  break;
              }
            }
              break;
          }
        }
      } else {
        Alert.alert('', 'You entered the wrong directive! Only M, R, L!', [{ text: 'OK' }]);
        x = 0, y = 0
        setDirectives()
        break;
      }
    }

    return {
      degree: degree,
      x: x,
      y: y
    }
  }

  const degreeToLetter = (degree) => {
    let val
    switch (degree % 360) {
      case 0: val = 'E'
        break;
      case -0: val = 'E'
        break;
      case 90: val = 'N'
        break;
      case -270: val = 'N'
        break;
      case -180: val = 'W'
        break;
      case 180: val = 'W'
        break;
      case -90: val = 'S'
        break;
      case 270: val = 'S'
        break;
    }
    return val
  }

  const setAll = () => {
    setResponse()
    setSizeX()
    setSizeY()
    setFirstX()
    setFirstY()
    setFirstD()
    setDirectives()
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.containers}>
        <TextInput
          value={sizeX}
          keyboardType='number-pad'
          style={styles.inputStyle}
          onChangeText={(val) => setSizeX(val)}
          placeholder='Xt'
        />
        <TextInput
          value={sizeY}
          keyboardType='number-pad'
          style={styles.inputStyle}
          onChangeText={(val) => setSizeY(val)}
          placeholder='Yt'
        />
      </View>
      <View style={styles.containers}>

        <TextInput
          value={firstX}
          keyboardType='number-pad'
          style={styles.inputStyle}
          onChangeText={(val) => setFirstX(val)}
          placeholder='X'
        />
        <TextInput
          value={firstY}
          keyboardType='number-pad'
          style={styles.inputStyle}
          onChangeText={(val) => setFirstY(val)}
          placeholder='Y'
        />
        <TextInput
          value={firstD}
          style={styles.inputStyle}
          onChangeText={(val) => setFirstD(val)}
          placeholder='D'
        />
      </View>
      <TextInput
        value={directives}
        onChangeText={(val) => setDirectives(val)}
        placeholder='Directives'
        autoCapitalize='characters'
        style={styles.inputStyle}
      />
      <View style={styles.containers} >
        <Button onPress={() => calculate()} title='Calculate' />
        <Button onPress={() => setAll()} title='set All' />
      </View>
      <Text style={styles.text}>
        Result= {response ? 'X:' + response.x + '  Y:' + response.y + '  Direction:' + response.direction : null}
      </Text>

    </View>
  );
}

export default App;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    padding: 40
  },
  text: {
    width: 350,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'left'
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  containers: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-around',
    marginTop: 20
  }
})
