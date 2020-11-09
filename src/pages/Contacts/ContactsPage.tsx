import React from "react"

import { withRouter } from "react-router-dom"
import ContactsDialog from "./ContactsDialog"

function ContactsPage({
  history,
}: import("react-router-dom").RouteChildrenProps) {
  return (
    <ContactsDialog onCloseClick={history.goBack} open allowEditing={true} />
  )
}

export default withRouter(ContactsPage)
