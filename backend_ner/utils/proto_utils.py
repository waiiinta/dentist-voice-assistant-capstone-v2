from utils.ner_model_pb2 import NERResponse, Zee, CommandData, SemanticCommand, CommandUndo, BridgeZee

def create_ner_response(semantics):
    response = []
    print('pass one')
    for semantic in semantics:
        command = semantic.get("command", None)
        # if command == "BOP":
        if command in ["BOP", "SUP"]:
            data = CommandData(
                        zee = create_zee(semantic.get("data", dict()).get("zee", None)),
                        tooth_side = semantic.get("data", dict()).get("tooth_side", None),
                        position = semantic.get("data", dict()).get("position", None),
                        is_number_PD = semantic.get("data", dict()).get("is_number_PD", None),
                        # BOP_payload = semantic.get("data", dict()).get("payload", []),
                        BOP_payload = semantic.get("data", dict()).get("payload", []),
                        missing = create_missing(semantic.get("data", dict()).get("missing", None)),
                        crown = create_crown(semantic.get("data", dict()).get("crown", None)),
                        implant = create_implant(semantic.get("data", dict()).get("implant", None)),
                        bridge = create_bridge(semantic.get("data", dict()).get("bridge", None)),
                    )
            
        # {command: undo, object :semantic}
        elif command in ["Undo"]:
            bridge = None
            cmd_to_undo = semantic.get("object", dict()).get("command", None)
            if cmd_to_undo in ["Missing", "Crown", "Implant"]:
                zee = create_zee(semantic.get("object", dict()).get("data", dict()).get(cmd_to_undo.lower(), None)[-1])
            elif cmd_to_undo in ["Bridge"]:
                zee = None
                bridge = create_undo_bridge(semantic.get("object", dict()).get("data", dict()).get(cmd_to_undo.lower(), None)[-1])
                print("beforeleft",bridge,type(bridge))
            else:
                zee = create_zee(semantic.get("object", dict()).get("data", dict()).get("zee", None))
            data = None
            try:
                data = CommandUndo(
                        command = cmd_to_undo,
                        zee = zee,
                        tooth_side = semantic.get("object", dict()).get("data", dict()).get("tooth_side", None),
                        position = semantic.get("object", dict()).get("data", dict()).get("position", None),
                        is_number_PD = semantic.get("object", dict()).get("data", dict()).get("is_number_PD", None),
                        bridge = bridge
                    )
            except Exception as err:
                print(err)
            print("pass here")
        else:
            print('pass two')
            data = CommandData(
                        zee = create_zee(semantic.get("data", dict()).get("zee", None)),
                        tooth_side = semantic.get("data", dict()).get("tooth_side", None),
                        position = semantic.get("data", dict()).get("position", None),
                        is_number_PD = semantic.get("data", dict()).get("is_number_PD", None),
                        payload = semantic.get("data", dict()).get("payload", 100),
                        missing = create_missing(semantic.get("data", dict()).get("missing", None)),
                        crown = create_crown(semantic.get("data", dict()).get("crown", None)),
                        implant = create_implant(semantic.get("data", dict()).get("implant", None)),
                        bridge = create_bridge(semantic.get("data", dict()).get("bridge", None)),
                    )
            print(data)
        is_complete = semantic.get("is_complete", True)
        if command in ["Undo"]:
            semantic_command = SemanticCommand(command=command, data=None, undo=data, is_complete=is_complete)
        else:
            semantic_command = SemanticCommand(command=command, data=data, undo=None, is_complete=is_complete)
        response.append(semantic_command)
        print(response)
    return NERResponse(response=response)

def create_zee(list_zee):
    if list_zee is None:
        return None
    first_zee = None
    second_zee = None

    if len(list_zee) >= 1:
        first_zee = list_zee[0]
    if len(list_zee) == 2:
        second_zee = list_zee[1]
    
    
    return Zee(first_zee = first_zee, second_zee = second_zee)

def create_missing(list_missing):
    if list_missing is None:
        return None
    
    result = []
    for missing in list_missing:
        result.append(create_zee(missing))
    return result

def create_crown(list_crown):
    if list_crown is None:
        return None
    
    result = []
    for crown in list_crown:
        result.append(create_zee(crown))
    return result

def create_implant(list_implant):
    if list_implant is None:
        return None
    
    result = []
    for implant in list_implant:
        result.append(create_zee(implant))
    return result

def create_bridge(list_bridge):
    if list_bridge is None:
        return None
    
    result = []
    for bridge in list_bridge:
        print(bridge[0])
        print(bridge[1])
        result.append(BridgeZee(zee=[create_zee(bridge[0]), create_zee(bridge[1])]))
        print(result)
    return result

def create_undo_bridge(list_bridge):
    if list_bridge is None:
        return None
    result = []
    print(list_bridge)
    # print(bridge[1])
    return BridgeZee(zee=[create_zee(list_bridge[0]), create_zee(list_bridge[1])])


def create_incomplete_semantic(command, tooth, tooth_side, position):
    return {
                "command": command,
                "data": {
                    "zee": tooth,
                    "tooth_side": tooth_side,
                    "position": position,
                },
                "is_complete": False
            }
