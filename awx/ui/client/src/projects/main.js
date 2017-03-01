/*************************************************
 * Copyright (c) 2016 Ansible, Inc.
 *
 * All Rights Reserved
 *************************************************/

import ProjectsList from './list/projects-list.controller';
import ProjectsAdd from './add/projects-add.controller';
import ProjectsEdit from './edit/projects-edit.controller';
import { N_ } from '../i18n';

export default
angular.module('Projects', [])
    .controller('ProjectsList', ProjectsList)
    .controller('ProjectsAdd', ProjectsAdd)
    .controller('ProjectsEdit', ProjectsEdit)
    .config(['$stateProvider', 'stateDefinitionsProvider',
        function($stateProvider, stateDefinitionsProvider) {
            let stateDefinitions = stateDefinitionsProvider.$get();

            // lazily generate a tree of substates which will replace this node in ui-router's stateRegistry
            // see: stateDefinition.factory for usage documentation
            $stateProvider.state({
                name: 'projects',
                url: '/projects',
                lazyLoad: () => stateDefinitions.generateTree({
                    parent: 'projects', // top-most node in the generated tree (will replace this state definition)
                    modes: ['add', 'edit'],
                    list: 'ProjectList',
                    form: 'ProjectsForm',
                    controllers: {
                        list: ProjectsList, // DI strings or objects
                        add: ProjectsAdd,
                        edit: ProjectsEdit
                    },
                    data: {
                        activityStream: true,
                        activityStreamTarget: 'project',
                        socket: {
                            "groups": {
                                "jobs": ["status_changed"]
                            }
                        }
                    },
                    ncyBreadcrumb: {
                        label: N_('PROJECTS')
                    }
                })
            });
        }
    ]);