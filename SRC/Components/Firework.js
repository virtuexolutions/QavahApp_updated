import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Animated, Easing } from 'react-native';

let skyHeight;
let skyWidth;
let skyZindex;
let explosionIterations;
let count = 0;
let yPositions = [];
let xPositions = [];

export default class Firework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [],
      y: [],
    };
    this.fadingOpacity = new Animated.Value(1);
    this.movingBall = new Animated.Value(0);
  }

 
    

  UNSAFE_componentWillMount = () => {
    const { height, width, zIndex, iterations, circular } = this.props;
    if (circular) {
      this.fillXYpositions();
    }
    if (height && typeof height === 'number') {
      skyHeight = height;
    } else {
      skyHeight = Dimensions.get('window').height;
    }
    if (width && typeof width === 'number') {
      skyWidth = width;
    } else {
      skyWidth = Dimensions.get('window').width;
    }
    if (zIndex && typeof zIndex === 'number') {
      skyZindex = zIndex;
    } else {
      skyZindex = 10;
    }
    if (iterations && typeof iterations === 'number') {
      explosionIterations = iterations;
    } else {
      explosionIterations = 'infinite';
    }
    this.setExplosionSpots();
  };

  fillXYpositions = () => {
    let x, y;
    for (let i = 0; i <= 5; i++) {
      x = i * i * 8;
      xPositions[i] = x;
      xPositions[i + 5] = x;
      xPositions[i + 10] = 200 - x;
      xPositions[i + 15] = 200 - x;
      yPositions[i] = 100 - (Math.sqrt(10000 - (x - 100) * (x - 100)));
      yPositions[i + 5] = 100 + (Math.sqrt(10000 - (x - 100) * (x - 100)));
      yPositions[i + 10] = 100 - (Math.sqrt(10000 - (x - 100) * (x - 100)));
      yPositions[i + 15] = 100 + (Math.sqrt(10000 - (x - 100) * (x - 100)));
    }
  }

  setExplosionSpots = (shouldUpdateCounts) => {
    let { density } = this.props;
    if (density && typeof density === 'number' && density > 0) {
      if (density > 10) {
        density = 10;
      }
    } else {
      density = 5;
    }
    let x = [],
      y = [],
      i;
    for (i = 0; i < density; i++) {
      x[i] = this.getRandom(skyWidth);
      y[i] = this.getRandom(skyHeight);
    }
    this.setState({ x, y }, () => {
      if (explosionIterations && typeof explosionIterations === 'number') {
        if (shouldUpdateCounts) {
          count++;
        }
        if (count < explosionIterations) {
          this.animateOpacity();
          this.animateBall();
        }
      } else {
        this.animateOpacity();
        this.animateBall();
      }
    });
  };

  animateOpacity() {
    const { speed } = this.props;
    this.fadingOpacity.setValue(1);
    Animated.timing(this.fadingOpacity, {
      toValue: 0,
      duration: speed === 1 ? 900 : speed === 3 ? 500 : 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() =>
      this.setExplosionSpots(true)
    );
  }

  animateBall() {
    const { speed } = this.props;
    this.movingBall.setValue(0);
    Animated.timing(this.movingBall, {
      toValue: 1,
      duration: speed === 1 ? 900 : speed === 3 ? 500 : 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }

  getRandom = (n) => {
    return Math.round(Math.random() * n);
  };

  getRandomColors = () => {
    const { colors } = this.props;
    if (colors && colors.length > 0) {
      let l = colors.length - 1;
      let n = Math.round(Math.random() * l);
      return colors[n];
    } else {
      return 'rgb(161,114,46)';
    }
  }

  explosionBox = (color) => {
    const { circular, iterations,data } = this.props;
    let ballSize = this.movingBall.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 12]
    });
    let ballRadius = this.movingBall.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 6]
    });
    let balls = [],
      randomTops = [],
      randomLefts = [],
      x, y, loopCount;
    loopCount = circular ? 20 : 30;
    for (let i = 0; i <= loopCount; i++) {
      balls.push(data[this.getRandom(3)]);
      if (circular) {
        x = xPositions[i];
        y = yPositions[i];
        randomTops[i] = this.movingBall.interpolate({
          inputRange: [0, 1],
          outputRange: [100, y]
        });
        randomLefts[i] = this.movingBall.interpolate({
          inputRange: [0, 1],
          outputRange: [100, x]
        });
      }
      else {
        randomTops[i] = this.movingBall.interpolate({
          inputRange: [0, 1],
          outputRange: [100, this.getRandom(200)],
        });
        randomLefts[i] = this.movingBall.interpolate({
          inputRange: [0, 1],
          outputRange: [100, this.getRandom(200)],
        });
      }
    }
    let ballOpacity = this.fadingOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    if (!iterations || count < iterations - 1) {
      return (
        <View style={styles.explosionBoundary}>
          {balls.map((ball, index) => {
            return (
              <Animated.View key={index}
                style={[
                  styles.ball,
                  {
                    height: circular ? ballSize : 7,
                    width: circular ? ballSize : 7,
                    borderRadius: circular ? ballRadius : 3,
                    top: randomTops[index],
                    left: randomLefts[index],
                    opacity: circular ? 1 : ballOpacity,
                    backgroundColor: color || this.getRandomColors(),
                  },
                ]}
              >{ball}</Animated.View>
            );
          })}
        </View>
      );
    }
    return null;
  };
  render() {
    const { x, y } = this.state;
    const { iterations } = this.props;
    if (!iterations || count < iterations) {
      return (
        <View style={styles.container} >
          {x.map((xItem, index) => {
            return (
              <View key={index}
                style={{
                  top: y[index],
                  left: x[index],
                }}>
                {this.explosionBox(this.getRandomColors())}
              </View>
            );
          })}
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
     top: 80,
    left: -10,
    zIndex: skyZindex,
    width: skyWidth,
    height: skyHeight,
    backgroundColor:'black',

  },
  explosionBoundary: {
    position: 'absolute',
    height: 200,
    width: 200,
    zIndex: skyZindex,
    // backgroundColor:'black',
  },
  ball: {
    position: 'absolute',
  },
});


















// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, View, Animated, Easing } from 'react-native';
// import { windowWidth } from '../Utillity/utils';
// import { moderateScale } from 'react-native-size-matters';
// import Color from '../Assets/Utilities/Color';
// import { Icon } from 'native-base';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Firework = () => {
//   const [x, setX] = useState([]);
//   const [y, setY] = useState([]);
//   const fadingOpacity = useRef(new Animated.Value(1)).current;
//   const movingBall = useRef(new Animated.Value(0)).current;

//   const icons = [
//     <Icon name={'star-outlined'} as={Entypo} color={Color.themeColor} size={6} />,
//     <Icon name={'diamond'} as={MaterialCommunityIcons} color={Color.themeColor} size={6} />,
//     <Icon name={'exclamation'} as={FontAwesome} color={Color.themeColor} size={6} />,
//   ];

//   useEffect(() => {
//     animateOpacity();
//     animateBall();
//   }, []);

//   const getRandom = (n) => {
//     return Math.round(Math.random() * n);
//   };
//   fillXYpositions = () => {
//     let x, y;
//     for (let i = 0; i <= 5; i++) {
//       x = i * i * 8;
//       xPositions[i] = x;
//       xPositions[i + 5] = x;
//       xPositions[i + 10] = 200 - x;
//       xPositions[i + 15] = 200 - x;
//       yPositions[i] = 100 - (Math.sqrt(10000 - (x - 100) * (x - 100)));
//       yPositions[i + 5] = 100 + (Math.sqrt(10000 - (x - 100) * (x - 100)));
//       yPositions[i + 10] = 100 - (Math.sqrt(10000 - (x - 100) * (x - 100)));
//       yPositions[i + 15] = 100 + (Math.sqrt(10000 - (x - 100) * (x - 100)));
//     }
//   }

//   const animateOpacity = () => {
//     fadingOpacity.setValue(1);
//     Animated.timing(fadingOpacity, {
//       toValue: 0,
//       duration: 2500,
//       easing: Easing.bounceInUp,
//       useNativeDriver: false,
//     }).start(animateOpacity);
//   };

//   const animateBall = () => {
//     movingBall.setValue(0);
//     Animated.timing(movingBall, {
//       toValue: 1,
//       duration: 2500,
//       easing: Easing.bounceInUp,
//       useNativeDriver: false,
//     }).start(animateBall);
//   };

//   let balls = [];
//   let randomTops = [];
//   let randomLefts = [];
//   let randomColors = [];
//   for (let i = 0; i < 30; i++) {
//     let randomIcon = getRandom(3);
//     balls.push(icons[randomIcon]);
//     x = xPositions[i];
//     y = yPositions[i];
//     randomTops[i] = this.movingBall.interpolate({
//       inputRange: [0, 1],
//       outputRange: [100, y]
//     });
//     randomLefts[i] = this.movingBall.interpolate({
//       inputRange: [0, 1],
//       outputRange: [100, x]
//     });
//     randomColors[i] = 'rgb(161,114,46)';
//   }

//   let ballOpacity = fadingOpacity.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 1],
//   });

//   return (
//     <View style={styles.explosionBoundary}>
//       {balls.map((ball, index) => {
//         return (
//           <Animated.View
//             key={index}
//             style={[
//               styles.ball,
//               {
//                 top: randomTops[index],
//                 left: randomLefts[index],
//                 opacity: ballOpacity,
//                 backgroundColor: randomColors[index],
//               },
//             ]}
//           >
//             {ball}
//           </Animated.View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   explosionBoundary: {
//     position: 'absolute',
//     width: windowWidth,
//     backgroundColor: 'black',
//     top: moderateScale(100, 0.6),
//   },
//   ball: {
//     position: 'absolute',
//     height: 1,
//     width: 1,
//   },
// });

// export default Firework;
