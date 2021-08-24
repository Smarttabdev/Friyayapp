/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenSeven_query$ref = any;
export type OrganizerQuizScreenSevenQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenSevenQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenSeven_query$ref
|};
export type OrganizerQuizScreenSevenQuery = {|
  variables: OrganizerQuizScreenSevenQueryVariables,
  response: OrganizerQuizScreenSevenQueryResponse,
|};
*/


/*
query OrganizerQuizScreenSevenQuery(
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
    "name": "OrganizerQuizScreenSevenQuery",
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
    "name": "OrganizerQuizScreenSevenQuery",
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
    "cacheID": "779c550c65a375db6c845845604fd8d8",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenSevenQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenSevenQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenSeven_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenSeven_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen7\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '19f511d122c0784369f7491b76ef74e6';

module.exports = node;
