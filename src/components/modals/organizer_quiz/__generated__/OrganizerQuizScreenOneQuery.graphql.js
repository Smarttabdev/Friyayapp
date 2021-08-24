/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenOne_query$ref = any;
export type OrganizerQuizScreenOneQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenOneQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenOne_query$ref
|};
export type OrganizerQuizScreenOneQuery = {|
  variables: OrganizerQuizScreenOneQueryVariables,
  response: OrganizerQuizScreenOneQueryResponse,
|};
*/


/*
query OrganizerQuizScreenOneQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenOne_query_1JS2nm
}

fragment OrganizerQuizScreenOne_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen1") {
    id
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "owner"
  }
],
v1 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrganizerQuizScreenOneQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenOne_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenOneQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen1"
          },
          (v1/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "98fa77d5dbf1d7514cfffc393c50fa6e",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenOneQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenOneQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenOne_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenOne_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen1\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5d28f0f54cd21273b50cf116ad061321';

module.exports = node;
