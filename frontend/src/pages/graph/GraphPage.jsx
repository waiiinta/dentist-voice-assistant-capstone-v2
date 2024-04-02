import { Fragment, useEffect, useState } from "react";
import classes from "./GraphPage.module.css";
// import graph from "../../images/marking_graph.jpg";
import graph from "../../images/plain_graph.jpg";
import NavBar from "../../components/ui/NavBar";
import GraphControlBar from "../../components/graph/GraphControlBar";
import GraphBox from "../../components/graph/GraphBox";
import InformationBox from "../../components/graph/InformationBox";
import ToothNumBox from "../../components/graph/ToothNumBox";

const GraphPage = () => {
  let series = [
    {
      data: [
        [1, 1],
        [2, 3],
        [3, 2],
        [4, 2],
        [5, 1],
        [6, 4],
        [7, 2],
        [8, 3],
        [9, 0],
        [10, 0],
        [11, 2],
        [12, 0],
        [13, 4],
        [14, 1],
        [15, 7],
        [16, 3],
        [17, 6],
        [18, 2],
        [19, 0],
        [20, 3],
        [21, 1],
        [22, 0],
        [23, 2],
        [24, 0],
      ],
    },
    {
      data: [
        [1, -1],
        [2, -3],
        [3, -2],
        [4, -2],
        [5, -1],
        [6, -4],
        [7, -2],
        [8, -3],
        [9, 0],
        [10, 0],
        [11, -2],
        [12, 0],
        [13, -4],
        [14, -1],
        [15, -5],
        [16, -3],
        [17, -1],
        [18, -2],
        [19, 0],
        [20, -3],
        [21, -1],
        [22, 0],
        [23, -2],
        [24, -0],
      ],
    },
    {
      data:[[1,0],[24,0]]
    }
  ]
  let series2 = [
    {
      data: [
        [1, -1],
        [2, -3],
        [3, -2],
        [4, -2],
        [5, -1],
        [6, -4],
        [7, -2],
        [8, -3],
        [9, 0],
        [10, 0],
        [11, -2],
        [12, 0],
        [13, -4],
        [14, -1],
        [15, -7],
        [16, -3],
        [17, -6],
        [18,-2],
        [19, -0],
        [20, -3],
        [21, -1],
        [22, 0],
        [23, -2],
        [24, 0],
      ],
    },
    {
      data: [
        [1, 1],
        [2, 3],
        [3, 2],
        [4, 2],
        [5, 1],
        [6, 4],
        [7, 2],
        [8, 3],
        [9, 0],
        [10, 0],
        [11, 2],
        [12, 0],
        [13, 4],
        [14, 1],
        [15, 5],
        [16, 3],
        [17, 1],
        [18, 2],
        [19, 0],
        [20, 3],
        [21, 1],
        [22, 0],
        [23, 2],
        [24, 0],
      ],
    },
    {
      data:[[1,0],[24,0]]
    }
  ]
  let data = [
    {
        "quadrant": 1,
        "idxArray": [
            {
                "ID": 8,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 3,
                            "middle": 2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 0,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 0,
                            "middle": 1,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 1,
                "FUR": {
                    "mesial": 2,
                    "buccal": 2,
                    "lingual": 1,
                    "distal": 3
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 7,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 3,
                            "middle": 3,
                            "distal": 3
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 2,
                "FUR": {
                    "mesial": 3,
                    "buccal": 3,
                    "lingual": 1,
                    "distal": 2
                },
                "crown": false,
                "bridge": true,
                "implant": false,
                "bridge_edge": true
            },
            {
                "ID": 6,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": null,
                "MGJ": null,
                "FUR": {
                    "mesial": null,
                    "buccal": null,
                    "lingual": null,
                    "distal": null
                },
                "crown": null,
                "bridge": true,
                "implant": null,
                "bridge_edge": false
            },
            {
                "ID": 5,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": null,
                "MGJ": null,
                "crown": null,
                "bridge": true,
                "implant": null,
                "bridge_edge": false
            },
            {
                "ID": 4,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": 0,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": -2,
                            "middle": -2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": -2,
                            "middle": 2,
                            "distal": 3
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 3,
                "MGJ": 2,
                "FUR": {
                    "mesial": 2,
                    "distal": 1
                },
                "crown": false,
                "bridge": true,
                "implant": false,
                "bridge_edge": true
            },
            {
                "ID": 3,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": -1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": -1,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": -1,
                            "middle": -1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": -1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 3,
                "crown": true,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 2,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": -3,
                            "middle": -1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": -4,
                            "middle": -2,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 1,
                "crown": false,
                "bridge": null,
                "implant": true,
                "bridge_edge": null
            },
            {
                "ID": 1,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": -5,
                            "distal": -4
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": -1,
                            "distal": -4
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 2,
                            "distal": 3
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 2,
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            }
        ]
    },
    {
        "quadrant": 2,
        "idxArray": [
            {
                "ID": 1,
                "missing": true,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": null,
                "MGJ": null,
                "crown": null,
                "bridge": null,
                "implant": null,
                "bridge_edge": null
            },
            {
                "ID": 2,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 0,
                            "middle": 1,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 0,
                            "middle": 1,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 1,
                "crown": false,
                "bridge": null,
                "implant": true,
                "bridge_edge": null
            },
            {
                "ID": 3,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": 2,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": -2,
                            "middle": 1,
                            "distal": 2
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": -1,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": -2,
                            "distal": -1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 2,
                "crown": true,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 4,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": -2,
                            "distal": -1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 2,
                            "distal": 2
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 3,
                "FUR": {
                    "mesial": 2,
                    "distal": 1
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 5,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": -1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 0,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 2,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 1,
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 6,
                "missing": true,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": null,
                "MGJ": null,
                "FUR": {
                    "mesial": null,
                    "buccal": null,
                    "lingual": null,
                    "distal": null
                },
                "crown": null,
                "bridge": null,
                "implant": null,
                "bridge_edge": null
            },
            {
                "ID": 7,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 3,
                            "middle": 2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 3,
                "FUR": {
                    "mesial": 2,
                    "buccal": 2,
                    "lingual": 3,
                    "distal": 1
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 8,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 2,
                            "middle": 1,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": -2,
                            "middle": -1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 0,
                            "middle": 2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 1,
                "FUR": {
                    "mesial": 1,
                    "buccal": 1,
                    "lingual": 2,
                    "distal": 3
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            }
        ]
    },
    {
        "quadrant": 3,
        "idxArray": [
            {
                "ID": 1,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 2,
                            "middle": 1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 2,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 2,
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 2,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 2,
                            "middle": -1,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": 2,
                            "middle": -2,
                            "distal": -2
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": -1,
                            "middle": 0,
                            "distal": -1
                        },
                        "RE": {
                            "mesial": -1,
                            "middle": 0,
                            "distal": -2
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 1,
                "crown": false,
                "bridge": null,
                "implant": true,
                "bridge_edge": null
            },
            {
                "ID": 3,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 2,
                            "middle": 2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 2,
                            "middle": 1,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": -5,
                            "middle": -4,
                            "distal": -5
                        },
                        "RE": {
                            "mesial": -5,
                            "middle": -4,
                            "distal": -5
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 3,
                "crown": true,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 4,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": -2,
                            "middle": -2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": -3,
                            "middle": -2,
                            "distal": -2
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 2,
                            "distal": 3
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": true,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 2,
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 5,
                "missing": true,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": null,
                "MGJ": null,
                "crown": null,
                "bridge": null,
                "implant": null,
                "bridge_edge": null
            },
            {
                "ID": 6,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 3,
                            "middle": 2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 2,
                            "distal": 3
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 3,
                "FUR": {
                    "mesial": 2,
                    "buccal": 2,
                    "lingual": 1,
                    "distal": 3
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 7,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 2,
                            "middle": 1,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 2
                        },
                        "RE": {
                            "mesial": 2,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 2,
                "FUR": {
                    "mesial": 1,
                    "buccal": 1,
                    "lingual": 3,
                    "distal": 2
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 8,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 3,
                            "middle": 2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 2,
                            "distal": 3
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 1,
                "FUR": {
                    "mesial": 2,
                    "buccal": 2,
                    "lingual": 3,
                    "distal": 1
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            }
        ]
    },
    {
        "quadrant": 4,
        "idxArray": [
            {
                "ID": 8,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 3,
                            "middle": 2,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": true,
                            "distal": null
                        }
                    }
                ],
                "MO": 4,
                "MGJ": 1,
                "FUR": {
                    "mesial": 1,
                    "buccal": 3,
                    "lingual": 1,
                    "distal": 2
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 7,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 2,
                            "middle": 2,
                            "distal": 2
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 3,
                "FUR": {
                    "mesial": 3,
                    "buccal": 1,
                    "lingual": 2,
                    "distal": 1
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 6,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 2,
                            "middle": 1,
                            "distal": 3
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": true,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 2,
                "FUR": {
                    "mesial": 3,
                    "buccal": 3,
                    "lingual": 2,
                    "distal": 1
                },
                "crown": false,
                "bridge": null,
                "implant": false,
                "bridge_edge": null
            },
            {
                "ID": 5,
                "missing": true,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": null,
                "MGJ": null,
                "crown": null,
                "bridge": null,
                "implant": null,
                "bridge_edge": null
            },
            {
                "ID": 4,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": 2,
                            "distal": 3
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": 1,
                "MGJ": 3,
                "crown": false,
                "bridge": true,
                "implant": false,
                "bridge_edge": true
            },
            {
                "ID": 3,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": null,
                "MGJ": null,
                "crown": null,
                "bridge": true,
                "implant": null,
                "bridge_edge": false
            },
            {
                "ID": 2,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "RE": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": null,
                "MGJ": null,
                "crown": null,
                "bridge": true,
                "implant": null,
                "bridge_edge": false
            },
            {
                "ID": 1,
                "missing": false,
                "depended_side_data": [
                    {
                        "side": "buccal",
                        "PD": {
                            "mesial": 1,
                            "middle": 1,
                            "distal": 1
                        },
                        "RE": {
                            "mesial": -1,
                            "middle": -1,
                            "distal": -1
                        },
                        "BOP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        },
                        "SUP": {
                            "mesial": null,
                            "middle": null,
                            "distal": true
                        }
                    },
                    {
                        "side": "lingual",
                        "PD": {
                            "mesial": 0,
                            "middle": 0,
                            "distal": 0
                        },
                        "RE": {
                            "mesial": 1,
                            "middle": -2,
                            "distal": -1
                        },
                        "BOP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        },
                        "SUP": {
                            "mesial": true,
                            "middle": null,
                            "distal": null
                        }
                    }
                ],
                "MO": 0,
                "MGJ": 3,
                "crown": false,
                "bridge": true,
                "implant": false,
                "bridge_edge": true
            }
        ]
    }
]
  return (
    <Fragment>
      <div className= {classes.block}>
        <div className={classes.topbar}>
          <NavBar></NavBar>
        </div>
        <div className= {classes.image}>
            <div className={classes.container}>
              <InformationBox
                quadrant={[1,2]}
                data={[data[0],data[1]]}
                side="Buccal"
              />
              <GraphBox
                quadrant={[1,2]}
                series={series}
              />
              <InformationBox
                quadrant={[1,2]}
                data={[data[0],data[1]]}
                side="Lingual"
              />
              <GraphBox
                quadrant={[1,2]}
                series={series}
              />
              {/* <div className={classes.tooth_no}>
                <div className = {classes.tooth_status}/>
                <div className = {classes.tooth_status}/>
                <div className = {classes.tooth_status}/>
                <div className = {classes.tooth_status}/>
                <div className = {classes.tooth_status}/>
                <div className = {classes.tooth_status}/>
                <div className = {classes.tooth_status}/>
                <div className = {classes.tooth_status}/>
              </div> */}
              <ToothNumBox
                quadrant={[1,2]}
                data={[data[0],data[1]]}
              />
              <div className={classes.num_space}/>
              <ToothNumBox
                quadrant={[4,3]}
                data={[data[3],data[2]]}
              />
              <GraphBox
                quadrant={[4,3]}
                series={series2}
              />
              <InformationBox
                quadrant={[4,3]}
                data={[data[3],data[2]]}
                side="Lingual"
              />
              <GraphBox
                quadrant={[4,3]}
                series={series2}
              />
              <InformationBox
                quadrant={[4,3]}
                data={[data[3],data[2]]}
                side="Buccal"
              />
            </div>
            <img src={graph} className={classes.element}/>
        </div>
        <div className={classes.topbar}>
          <GraphControlBar/>
        </div>
      </div>
    </Fragment>
  );
};

export default GraphPage;
