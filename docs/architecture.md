In the current implementation of the LTFU workflow document over here. When we create a FHIR subscription resource, we 
provide a callback for the FHIR system to call when a Practitioner has had an encounter with the Patient. Currently,
the callback endpoint is being called directly by the FHIR server.

In this document, we will be discussing a proposed workflow for intercepting the callback request and implementing a cancel Task feature.

## Definitions
1. Requesting System
2. CHIS
3. CHW
4. SHR (FHIR)

## Flow
This document discusses an extension to the LTFU workflow which is discussed over here. We'll be skipping some trivia part of the workflow that has been documented and we'll start from when the requesting system sends a request to the mediator for the LTFU workflow.

### Workflow Overview
The workflow is designed around the requesting system having the ability to cancel follow up with a patient and the mediator having the ability to cancel request.

1. **Requesting System &#8594; Mediator** sends a list of patients and a callbak URL.
1. **Mediator &#8594; FHIR** creates subscriptions for patients with the mediator as callback.
1. **Mediator &#8594; CHIS** creates follow up task for the patients
1. **Mediator &#8594; Requesting System** returns a the Subscription ID
1. **CHIS &#8594; CHW** find the patient record and notifies the CHW
1. **CHW &#8594; CHIS** syncs the LFTU outcome with the CHIS
1. **CHIS &#8594; FHIR** pushes an Encounter resource to FHIR
1. **FHIR &#8594; Mediator** notifies the mediator of the LFTU Encounter
1. **Mediator &#8594; Requesting System** notifies the requesting system via callback URL on the Encounter.

![](./images/Workflow%20Overview.png)


The requesting systems will have the ability to cancel LTFU requests and check up on requests Here is an overview the LTFU request cancelation or update workflow:

1. Requesting System &#8594; Sends a list of Patients and callback URL to the Mediator
1. Mediator &#8594; Checks for a subscription with the callback URL, update the subscription, and notifies the CHIS
1. CHIS &#8594; Finds thes patient record and notifies the CHW
1. CHW &#8594; Syncs with the CHIS and the tasks get updated


### Mediator Data Storage

```ts
interface SubscriptionDocument {
  _id: string;
  subscription_id: string; // ID received from FHIR
  callback_url: string; // callback URL for the Mediator 
}
```

## Missing Features

- Verifying the requesting system for a subscription update is the same system that created the subscription.
- Handling retries on the Mediator for callback URLs that aren't reachable.
- Sending a ping to the callback URL to ensure it is an valid callback URL.

## Useful links
- [Request Community Based Follow-Up](https://wiki.ohie.org/display/SUB/Use+Case+Summary:+Request+Community+Based+Follow-Up)

