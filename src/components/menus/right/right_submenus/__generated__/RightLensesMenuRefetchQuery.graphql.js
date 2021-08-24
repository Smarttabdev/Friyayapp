/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RightLensesMenu_query$ref = any;
export type RightLensesMenuRefetchQueryVariables = {|
  topicId?: ?string,
  owner: string,
|};
export type RightLensesMenuRefetchQueryResponse = {|
  +$fragmentRefs: RightLensesMenu_query$ref
|};
export type RightLensesMenuRefetchQuery = {|
  variables: RightLensesMenuRefetchQueryVariables,
  response: RightLensesMenuRefetchQueryResponse,
|};
*/


/*
query RightLensesMenuRefetchQuery(
  $topicId: ID
  $owner: ID!
) {
  ...RightLensesMenu_query_4xevJw
}

fragment RightLensesMenu_query_4xevJw on Query {
  activePinnedLensesOrder(topicId: $topicId) {
    id
    name
    order
  }
  screenOneFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen1") {
    id
    value
  }
  screenTwoFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen2") {
    id
    value
  }
  screenFourFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen4") {
    id
    value
  }
  screenSevenFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen7") {
    id
    value
  }
  screenEightFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen8") {
    id
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v2 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
},
v3 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RightLensesMenuRefetchQuery",
    "selections": [
      {
        "args": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "RightLensesMenu_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RightLensesMenuRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          (v3/*: any*/)
        ],
        "concreteType": "PinnedLensesOrder",
        "kind": "LinkedField",
        "name": "activePinnedLensesOrder",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "order",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "screenOneFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen1"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "screenTwoFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen2"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "screenFourFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen4"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "screenSevenFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen7"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "screenEightFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen8"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "22b7b7b0eb453d368c49de9664bac635",
    "id": null,
    "metadata": {},
    "name": "RightLensesMenuRefetchQuery",
    "operationKind": "query",
    "text": "query RightLensesMenuRefetchQuery(\n  $topicId: ID\n  $owner: ID!\n) {\n  ...RightLensesMenu_query_4xevJw\n}\n\nfragment RightLensesMenu_query_4xevJw on Query {\n  activePinnedLensesOrder(topicId: $topicId) {\n    id\n    name\n    order\n  }\n  screenOneFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen1\") {\n    id\n    value\n  }\n  screenTwoFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen2\") {\n    id\n    value\n  }\n  screenFourFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen4\") {\n    id\n    value\n  }\n  screenSevenFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen7\") {\n    id\n    value\n  }\n  screenEightFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen8\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4bf9bc3b8e0f694bf61c639d8e5a71e6';

module.exports = node;
