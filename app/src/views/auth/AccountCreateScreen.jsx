import { BaseLayout } from "@layout/BaseLayout";
import React from "react";
import { Text } from "react-native-ui-lib";

const AccountCreateScreen = () => {
  return (
        <BaseLayout enablePadding={true} enableSAV>

            <Text h4 primary center>
                Félicitations, vous êtes inscrits ! Vous allez recevoir un email de bienvenue ainsi qu'un deuxième email pour activer votre compte.
            </Text>
            <Text h4 primary center>
                Pensez à vérifier vos spam dans votre boîte mail.
            </Text>
        </BaseLayout>
  )
}

export default AccountCreateScreen