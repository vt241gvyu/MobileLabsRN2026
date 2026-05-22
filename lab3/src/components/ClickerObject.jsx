import { useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import { useGame } from '../context/GameContext';
import { colors } from '../theme/colors';

export default function ClickerObject() {
  const { addAction, isDark } = useGame();
  const appColors = isDark ? colors.dark : colors.light;
  const singleTapRef = useRef(null);
  const doubleTapRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [pinchScale, setPinchScale] = useState(1);

  function onSingleTap(event) {
    if (event.nativeEvent.state === State.ACTIVE) {
      addAction('taps', 1);
    }
  }

  function onDoubleTap(event) {
    if (event.nativeEvent.state === State.ACTIVE) {
      addAction('doubleTaps', 2);
    }
  }

  function onLongPress(event) {
    if (event.nativeEvent.state === State.ACTIVE) {
      addAction('longPresses', 10);
    }
  }

  function onPan(event) {
    const { translationX, translationY } = event.nativeEvent;
    setDrag({ x: translationX, y: translationY });
  }

  function onPanState(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX, translationY } = event.nativeEvent;
      setPosition((oldPosition) => ({
        x: oldPosition.x + translationX,
        y: oldPosition.y + translationY,
      }));
      setDrag({ x: 0, y: 0 });
      addAction('drags', 5);
    }
  }

  function onSwipeRight(event) {
    if (event.nativeEvent.state === State.ACTIVE) {
      addAction('swipesRight', 7);
    }
  }

  function onSwipeLeft(event) {
    if (event.nativeEvent.state === State.ACTIVE) {
      addAction('swipesLeft', 7);
    }
  }

  function onPinch(event) {
    setPinchScale(event.nativeEvent.scale);
  }

  function onPinchState(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const nextScale = Math.max(0.7, Math.min(scale * event.nativeEvent.scale, 1.8));
      setScale(nextScale);
      setPinchScale(1);
      addAction('pinches', 8);
    }
  }

  return (
    <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={onSwipeRight}>
      <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={onSwipeLeft}>
        <PinchGestureHandler onGestureEvent={onPinch} onHandlerStateChange={onPinchState}>
          <PanGestureHandler onGestureEvent={onPan} onHandlerStateChange={onPanState}>
            <LongPressGestureHandler minDurationMs={3000} onHandlerStateChange={onLongPress}>
              <TapGestureHandler
                ref={singleTapRef}
                waitFor={doubleTapRef}
                onHandlerStateChange={onSingleTap}
              >
                <TapGestureHandler
                  ref={doubleTapRef}
                  numberOfTaps={2}
                  onHandlerStateChange={onDoubleTap}
                >
                  <Animated.View
                    style={[
                      styles.object,
                      {
                        backgroundColor: appColors.object,
                        borderColor: appColors.objectDark,
                        transform: [
                          { translateX: position.x + drag.x },
                          { translateY: position.y + drag.y },
                          { scale: scale * pinchScale },
                        ],
                      },
                    ]}
                  >
                    <Text style={styles.icon}>★</Text>
                    <Text style={styles.label}>Tap</Text>
                  </Animated.View>
                </TapGestureHandler>
              </TapGestureHandler>
            </LongPressGestureHandler>
          </PanGestureHandler>
        </PinchGestureHandler>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  object: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    color: '#ffffff',
    fontSize: 42,
    lineHeight: 48,
  },
  label: {
    color: '#ffffff',
    marginTop: 2,
    fontSize: 18,
    fontWeight: '700',
  },
});
