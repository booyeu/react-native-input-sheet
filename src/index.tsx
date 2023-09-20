import React, {
  useCallback,
  useEffect,
  useRef,
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useStateRef} from 'react-hooks-extension';

const styles = StyleSheet.create({
  mask: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  input: {
    minHeight: 100,
    maxHeight: 250,
    fontSize: 15,
    lineHeight: 18,
    padding: 8,
    textAlignVertical: 'top',
  },
  btn: {
    alignSelf: 'flex-end',
    color: '#fff',
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 10,
  },
});

export type InputSheetType = {
  defaultValue?: string;
  onSubmit: (_?: string) => Promise<any> | void;
  placeholder?: string;
  buttonText?: string;
  required?: boolean;
  maskStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  buttonTextStyle?: TextStyle;
};

export type InputSheetRef = {show: () => void; hide: () => void};

const InputSheet = forwardRef<InputSheetRef, InputSheetType>(
    (
        {
          defaultValue = '',
          onSubmit,
          placeholder,
          buttonText = 'submit',
          required = true,
          maskStyle,
          containerStyle,
          inputStyle,
          buttonTextStyle,
        },
        ref,
    ) => {
      const [show, setShow] = useState(false);
      const [flag, setFlag, flagRef] = useStateRef(true);
      const [value, setValue, valueRef] = useStateRef<string>(defaultValue);
      const input = useRef<TextInput>(null);

      const hideMask = useCallback(() => {
        setShow(false);
      }, []);
      const submit = useCallback(() => {
        if (!flagRef.current && (!required || valueRef.current)) {
          return;
        }
        setFlag(false);
        const lastPromise = onSubmit(valueRef.current);
        if (lastPromise) {
          lastPromise
              .then(() => {
                setShow(false);
              })
              .finally(() => {
                setFlag(true);
              });
        } else {
          setShow(false);
          setFlag(true);
        }
      }, [flagRef, onSubmit, setFlag, valueRef, required]);

      useEffect(() => {
        if (show) {
          input.current?.focus();
        } else {
          input.current?.blur();
        }
      }, [show]);
      useEffect(() => {
        setValue(defaultValue);
      }, [defaultValue, setValue]);

      useImperativeHandle(ref, () => ({
        show: () => setShow(true),
        hide: () => setShow(false),
      }));

      return (
          <View
              style={[
                StyleSheet.absoluteFill,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  zIndex: 1,
                  display: show ? 'flex' : 'none',
                  position: show ? 'absolute' : 'relative',
                },
              ]}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={hideMask}
                style={[styles.mask, maskStyle]}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={102}
                style={[styles.container, containerStyle]}>
              <TextInput
                  ref={input}
                  style={[styles.input, inputStyle]}
                  value={value}
                  placeholder={placeholder}
                  onChangeText={setValue}
                  multiline
                  editable={flag}
              />
              <Pressable onPress={submit}>
                <Text
                    style={[
                      styles.btn,
                      {
                        opacity: (value || !required) && flag ? 1 : 0.5,
                      },
                      buttonTextStyle,
                    ]}>
                  {buttonText}
                </Text>
              </Pressable>
            </KeyboardAvoidingView>
          </View>
      );
    },
);

export default memo(InputSheet);
