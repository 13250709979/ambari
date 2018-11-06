/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var App = require('app');

App.servicesWarningView = Em.View.extend({
  templateName: require('templates/main/admin/stack_upgrade/custom_cluster_checks/custom_cluster_checks_service_warning'),

  classNames: ['custom-cluster-check', 'custom-cluster-check-warning'],

  services: function () {
    var self = this;
    return App.Service.find().toArray().filter( function ( service ) {
      var serviceId = service.get('id');
      if (self.get('check').failed_on.indexOf( serviceId ) != -1){
        return true;
      }
    })
  }.property('App.router.clusterController.isLoaded').volatile(),

  goToConfigs: function (event) {
    var service = event.context;
    App.router.transitionTo('services.service.configs', service);
    this.get('parentView.parentView').closeParent();
    this.get('parentView.parentView').onClose();
  }
});