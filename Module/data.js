var data = {
    id: 'demo@0.1.0',
    nodes: {
        '1': {
            id: 1,
            data: {
                num: 1
            },
            group: null,
            inputs: [],
            outputs: [
                {
                    connections: [
                        {
                            node: 4,
                            input: 0
                        }
                    ]
                }
            ],
            position: [19.999999999999982, 152.22222222222237],
            title: 'Number'
        },
        '2': {
            id: 2,
            data: {
                num: 0
            },
            group: null,
            inputs: [],
            outputs: [
                {
                    connections: [
                        {
                            node: 3,
                            input: 1
                        }
                    ]
                }
            ],
            position: [345.5555555555556, 406.66666666666634],
            title: 'Number'
        },
        '3': {
            id: 3,
            data: {},
            group: null,
            inputs: [
                {
                    connections: [
                        {
                            node: 4,
                            output: 0
                        }
                    ]
                },
                {
                    connections: [
                        {
                            node: 2,
                            output: 0
                        }
                    ]
                }
            ],
            outputs: [
                {
                    connections: []
                }
            ],
            position: [704.4444444444439, 195.55555555555554],
            title: 'Add'
        },
        '4': {
            id: 4,
            data: {
                module: {
                    name: 'My module',
                    data: {
                        id: 'demo@0.1.0',
                        nodes: {
                            '7': {
                                id: 7,
                                data: {
                                    name: 'v2'
                                },
                                group: null,
                                inputs: [],
                                outputs: [
                                    {
                                        connections: [
                                            {
                                                node: 15,
                                                input: 1
                                            }
                                        ]
                                    }
                                ],
                                position: [
                                    -93.71394621363416,
                                    505.98425562549585
                                ],
                                title: 'Input'
                            },
                            '9': {
                                id: 9,
                                data: {
                                    name: 'double v1'
                                },
                                group: null,
                                inputs: [
                                    {
                                        connections: [
                                            {
                                                node: 88,
                                                output: 0
                                            }
                                        ]
                                    }
                                ],
                                outputs: [],
                                position: [
                                    637.6435513968561,
                                    -184.8291048194067
                                ],
                                title: 'Output'
                            },
                            '10': {
                                id: 10,
                                data: {
                                    name: 'sum'
                                },
                                group: null,
                                inputs: [
                                    {
                                        connections: [
                                            {
                                                node: 15,
                                                output: 0
                                            }
                                        ]
                                    }
                                ],
                                outputs: [],
                                position: [
                                    774.9493041164646,
                                    308.1636631148435
                                ],
                                title: 'Output'
                            },
                            '14': {
                                id: 14,
                                data: {
                                    name: 'v1'
                                },
                                group: null,
                                inputs: [],
                                outputs: [
                                    {
                                        connections: [
                                            {
                                                node: 15,
                                                input: 0
                                            },
                                            {
                                                node: 88,
                                                input: 0
                                            }
                                        ]
                                    }
                                ],
                                position: [
                                    -71.74290831618177,
                                    249.59961913494988
                                ],
                                title: 'Input'
                            },
                            '15': {
                                id: 15,
                                data: {},
                                group: null,
                                inputs: [
                                    {
                                        connections: [
                                            {
                                                node: 14,
                                                output: 0
                                            }
                                        ]
                                    },
                                    {
                                        connections: [
                                            {
                                                node: 7,
                                                output: 0
                                            }
                                        ]
                                    }
                                ],
                                outputs: [
                                    {
                                        connections: [
                                            {
                                                node: 10,
                                                input: 0
                                            }
                                        ]
                                    }
                                ],
                                position: [404.962390750556, 276.1886386228065],
                                title: 'Add'
                            },
                            '88': {
                                id: 88,
                                data: {
                                    module: {
                                        name: 'module',
                                        data: {
                                            id: 'demo@0.1.0',
                                            nodes: {
                                                '89': {
                                                    id: 89,
                                                    data: {
                                                        name: 'input'
                                                    },
                                                    group: null,
                                                    inputs: [],
                                                    outputs: [
                                                        {
                                                            connections: [
                                                                {
                                                                    node: 130,
                                                                    input: 0
                                                                },
                                                                {
                                                                    node: 130,
                                                                    input: 1
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    position: [
                                                        184.56928361484566,
                                                        137.34879370987323
                                                    ],
                                                    title: 'Input'
                                                },
                                                '90': {
                                                    id: 90,
                                                    data: {
                                                        name: 'output'
                                                    },
                                                    group: null,
                                                    inputs: [
                                                        {
                                                            connections: [
                                                                {
                                                                    node: 130,
                                                                    output: 0
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    outputs: [],
                                                    position: [
                                                        674.0166446288425,
                                                        108.98828896969434
                                                    ],
                                                    title: 'Output'
                                                },
                                                '130': {
                                                    id: 130,
                                                    data: {},
                                                    group: null,
                                                    inputs: [
                                                        {
                                                            connections: [
                                                                {
                                                                    node: 89,
                                                                    output: 0
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            connections: [
                                                                {
                                                                    node: 89,
                                                                    output: 0
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    outputs: [
                                                        {
                                                            connections: [
                                                                {
                                                                    node: 90,
                                                                    input: 0
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    position: [
                                                        445.95963160196936,
                                                        81.50187174479166
                                                    ],
                                                    title: 'Add'
                                                }
                                            },
                                            groups: {}
                                        }
                                    }
                                },
                                group: null,
                                inputs: [
                                    {
                                        connections: [
                                            {
                                                node: 14,
                                                output: 0
                                            }
                                        ]
                                    }
                                ],
                                outputs: [
                                    {
                                        connections: [
                                            {
                                                node: 9,
                                                input: 0
                                            }
                                        ]
                                    }
                                ],
                                position: [
                                    281.13666714675486,
                                    -22.714951596441857
                                ],
                                title: 'Module'
                            }
                        },
                        groups: {}
                    }
                }
            },
            group: null,
            inputs: [
                {
                    connections: [
                        {
                            node: 1,
                            output: 0
                        }
                    ]
                },
                {
                    connections: [
                        {
                            node: 179,
                            output: 0
                        }
                    ]
                }
            ],
            outputs: [
                {
                    connections: [
                        {
                            node: 3,
                            input: 0
                        }
                    ]
                },
                {
                    connections: []
                }
            ],
            position: [327.777777777778, 109.9999999999999],
            title: 'Module'
        },
        '179': {
            id: 179,
            data: {
                num: 1
            },
            group: null,
            inputs: [],
            outputs: [
                {
                    connections: [
                        {
                            node: 4,
                            input: 1
                        }
                    ]
                }
            ],
            position: [12.777777777777768, 285.55555555555554],
            title: 'Number'
        }
    },
    groups: {}
};
