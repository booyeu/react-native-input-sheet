# react-native-input-sheet [![Monthly download](https://img.shields.io/npm/dm/react-native-input-sheet.svg)](https://img.shields.io/npm/dm/react-native-input-sheet.svg) [![Total downloads](https://img.shields.io/npm/dt/react-native-input-sheet.svg)](https://img.shields.io/npm/dt/react-native-input-sheet.svg)

## Install

```bash
npm install react-native-input-sheet --save
```

## Example
![example](https://github.com/BooYeu/react-native-input-sheet/blob/main/example/example.gif?raw=true)

## Usage

```javascript
import InputSheet, {InputSheetRef} from 'react-native-input-sheet';

const Example = () => {
    const inputSheetRef = useRef<InputSheetRef>(null);

    const showInputSheet = useCallback(() => {
        inputSheetRef.current?.show();
    }, []);
    return (
        <>
            <Button onPress={showInputSheet}>Press me</Button>
            <InputSheet ref={inputSheetRef} onSubmit={console.log} />
        </>
    )
}
```

## Properties

| Prop            |   Default    | Required | Description                                       |
|:----------------|:------------:|:--------:|:--------------------------------------------------|
| defaultValue    |    false     |    no    | the default value of textInput                    |
| required        |     true     |    no    | Whether the text input value is required          |
| placeholder     |      ''      |    no    | The placeholder of the textInput                  |
| onSubmit        | (text) => {} |    no    | Function that is called when user submits it      |
| buttonText      |   'submit'   |    no    | The string that is displayed on the submit button |
| maskStyle       |      -       |    no    | The style of the masker( <View> )                 |
| style           |      -       |    no    | The style of the container( <View> )              |
| inputStyle      |      -       |    no    | The style of the textinput( <Text> )              |
| buttonTextStyle |      -       |    no    | The style of the submit button text( <Text> )     |
