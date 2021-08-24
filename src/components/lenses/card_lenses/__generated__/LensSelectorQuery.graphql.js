/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LensSelectorQueryVariables = {|
  owner: string
|};
export type LensSelectorQueryResponse = {|
  +screenOneFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +screenTwoFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +screenFourFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +screenSevenFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +screenEightFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
|};
export type LensSelectorQuery = {|
  variables: LensSelectorQueryVariables,
  response: LensSelectorQueryResponse,
|};
*/


/*
query LensSelectorQuery(
  $owner: ID!
) {
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
},
v2 = [
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
v3 = [
  {
    "alias": "screenOneFavTools",
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
    "selections": (v2/*: any*/),
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
      (v1/*: any*/)
    ],
    "concreteType": "Config",
    "kind": "LinkedField",
    "name": "config",
    "plural": false,
    "selections": (v2/*: any*/),
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
      (v1/*: any*/)
    ],
    "concreteType": "Config",
    "kind": "LinkedField",
    "name": "config",
    "plural": false,
    "selections": (v2/*: any*/),
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
      (v1/*: any*/)
    ],
    "concreteType": "Config",
    "kind": "LinkedField",
    "name": "config",
    "plural": false,
    "selections": (v2/*: any*/),
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
      (v1/*: any*/)
    ],
    "concreteType": "Config",
    "kind": "LinkedField",
    "name": "config",
    "plural": false,
    "selections": (v2/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LensSelectorQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LensSelectorQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "ef6e56f691e4d33c79437dcad1cff794",
    "id": null,
    "metadata": {},
    "name": "LensSelectorQuery",
    "operationKind": "query",
    "text": "query LensSelectorQuery(\n  $owner: ID!\n) {\n  screenOneFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen1\") {\n    id\n    value\n  }\n  screenTwoFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen2\") {\n    id\n    value\n  }\n  screenFourFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen4\") {\n    id\n    value\n  }\n  screenSevenFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen7\") {\n    id\n    value\n  }\n  screenEightFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen8\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f413d66ff6d420fadc7fea92a0f9924f';

module.exports = node;
