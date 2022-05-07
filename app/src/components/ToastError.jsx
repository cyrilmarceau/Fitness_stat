import React from "react";
import { Incubator } from "react-native-ui-lib";
const { Toast } = Incubator;


const ToastError = ({error, setError, toastProps}) => {

  return (
      <Toast
        visible={error}
        preset={Incubator.ToastPresets.FAILURE}
        position={"top"}
        swipeable={true}
        autoDismiss={3000}
        zIndex={2}
        containerStyle={{ top: 0 }}
        centerMessage
        onDismiss={() => setError(false)}
        {...toastProps}
          
    />
  )
}

export default ToastError