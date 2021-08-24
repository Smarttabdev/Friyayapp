/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenSeven_query$ref = any;
export type OrganizerQuizScreenSevenRefetchQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenSevenRefetchQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenSeven_query$ref
|};
export type OrganizerQuizScreenSevenRefetchQuery = {|
  variables: OrganizerQuizScreenSevenRefetchQueryVariables,
  response: OrganizerQuizScreenSevenRefetchQueryResponse,
|};
*/


/*
query OrganizerQuizScreenSevenRefetchQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenSeven_query_1JS2nm
}

fragment OrganizerQuizScreenSeven_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen7") {
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
    "name": "OrganizerQuizScreenSevenRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenSeven_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenSevenRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen7"
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
    "cacheID": "464ec1dec4c83c65f5b1ce484e7e810b",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenSevenRefetchQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenSevenRefetchQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenSeven_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenSeven_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen7\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f945d96092800b31d9b72905038f9bed';

module.exports = node;
