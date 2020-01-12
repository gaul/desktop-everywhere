// Copyright 2018-2020 Andrew Gaul <andrew@gaul.org>
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
    "m.facebook.com": "facebook.com",
    "m.imdb.com": "imdb.com",
    "m.sfgate.com": "sfgate.com",
    "m.xkcd.com": "xkcd.com",
    "mobile.lemonde.fr": "lemonde.fr",
    "mobile.nytimes.com": "nytimes.com",
    "mobile.twitter.com": "twitter.com"
};

function listener(details) {
    let uri = new URL(details.url);
    let newhostname = matches[uri.hostname];
    if (newhostname !== undefined) {
        uri.hostname = newhostname
        return {redirectUrl: uri.href};
    } else if (uri.hostname.endsWith(".blogspot.com")) {
        for (const [key, value] of uri.searchParams) {
            if (key === "m" && value === "1") {
                uri.searchParams.delete(key);
                return {redirectUrl: uri.href};
            }
        }
    } else if (uri.hostname.endsWith(".m.wikipedia.org")) {
        let parts = uri.hostname.split(".");
        parts.splice(1, 1);
        uri.hostname = parts.join(".");
        return {redirectUrl: uri.href};
    }
    return {};
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    {urls: ["*://*/*"], types: ["main_frame"]},
    ["blocking"]
);
