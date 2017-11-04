/**
 * Copyright 2017 Plexus Interop Deutsche Bank AG
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ActionType } from "./ActionType";
import { EventType } from "./events/EventType";
import { Subscription, Observer } from "@plexus-interop/common";
import { StreamingInvocationClient } from "./StreamingInvocationClient";

export interface PeerTransport {
    
    sendUnary<Req, Res>(providerId: string, actionType: ActionType<Req, Res>, requestPaylaod: Req): Promise<Res>;
    
    sendServerStreaming<Req, Res>(providerId: string, actionType: ActionType<Req, Res>, requestPaylaod: Req, observer: Observer<Res>): Promise<void>;
    
    hostUnaryAction<Req, Res>(actionType: ActionType<Req, Res>, handler: (requestPaylaod: Req) => Promise<Res>): void;
    
    hostServerStreamingAction<Req, Res>(actionType: ActionType<Req, Res>, req: Req, streamingClient: StreamingInvocationClient<Res>): void;
    
    /**
     * Subscribe to multicast event
     */
    subscribe<T>(eventType: EventType<T>, handler: (payload: T) => void): Subscription;

    /**
     * Post multicast event
     */
    publish<T>(eventType: EventType<T>, payload: T): void;

}