// Copyright 2018 Andrew Gaul <andrew@gaul.org>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

let matches = {
    "m.bart.gov": "bart.gov",
    "m.clippercard.com": "clippercard.com",
    "mobile.nytimes.com": "nytimes.com",
    "mobile.twitter.com": "twitter.com"
};

function listener(details) {
    let uri = new URL(details.url);
    let newhostname = matches[uri.hostname];
    if (newhostname !== undefined) {
        uri.hostname = newhostname
        return {redirectUrl: uri.href};
    }
    return {};
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    {urls: ["*://*/*"], types: ["main_frame"]},
    ["blocking"]
);
