var data = {
    'id': 'glslsample@0.1.0',
    'nodes': {
        '2': {
            'id': 2,
            'data': {},
            'group': null,
            'inputs': [],
            'outputs': [
                {
                    'connections': [
                        {
                            'node': 3,
                            'input': 0
                        }
                    ]
                }, {
                    'connections': [
                        {
                            'node': 3,
                            'input': 1
                        }
                    ]
                }
            ],
            'position': [
                114, 133
            ],
            'title': 'Keydown event'
        },
        '3': {
            'id': 3,
            'data': {},
            'group': null,
            'inputs': [
                {
                    'connections': [
                        {
                            'node': 2,
                            'output': 0
                        }
                    ]
                }, {
                    'connections': [
                        {
                            'node': 2,
                            'output': 1
                        }
                    ]
                }
            ],
            'outputs': [
                {
                    'connections': [
                        {
                            'node': 10,
                            'input': 0
                        }
                    ]
                }, {
                    'connections': [
                        {
                            'node': 11,
                            'input': 0
                        }
                    ]
                }
            ],
            'position': [
                443, 112
            ],
            'title': 'Enter pressed'
        },
        '10': {
            'id': 10,
            'data': {
                'msg': 'Enter!'
            },
            'group': null,
            'inputs': [
                {
                    'connections': [
                        {
                            'node': 3,
                            'output': 0
                        }
                    ]
                }
            ],
            'outputs': [],
            'position': [
                773, 106
            ],
            'title': 'Alert'
        },
        '11': {
            'id': 11,
            'data': {
                'msg': 'Another key pressed'
            },
            'group': null,
            'inputs': [
                {
                    'connections': [
                        {
                            'node': 3,
                            'output': 1
                        }
                    ]
                }
            ],
            'outputs': [],
            'position': [
                766, 292
            ],
            'title': 'Alert'
        }
    },
    'groups': {}
};