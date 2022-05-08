import React from "react";
import { Incubator } from "react-native-ui-lib";
const { Toast } = Incubator;


const CuToast = ({displayToast, setDisplayToast, toastProps}) => {

  return (
      <Toast
        visible={displayToast}
        preset={toastProps.isError ? Incubator.ToastPresets.FAILURE : Incubator.ToastPresets.SUCCESS}
        position={"top"}
        swipeable={true}
        autoDismiss={3000}
        zIndex={2}
        containerStyle={{ top: 0 }}
        centerMessage
        onDismiss={() => setDisplayToast(false)}
        message={toastProps.message}
          
    />
  )
}

export default CuToast