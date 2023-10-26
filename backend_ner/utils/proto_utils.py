from utils.ner_model_pb2 import NERResponse, Zee, CommandData, SemanticCommand

def create_ner_response(semantics):
    response = []
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
                        payload = semantic.get("data", dict()).get("payload", []),
                        missing = create_missing(semantic.get("data", dict()).get("missing", None)),
                        crown = create_crown(semantic.get("data", dict()).get("crown", None)),
                        implant = create_implant(semantic.get("data", dict()).get("implant", None)),
                        bridge = create_bridge(semantic.get("data", dict()).get("bridge", None)),
                    )
        else:
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
        is_complete = semantic.get("is_complete", True)
        semantic_command = SemanticCommand(command=command, data=data, is_complete=is_complete)
        response.append(semantic_command)
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
        result.append(create_zee(bridge))
    return result

def create_incomplete_semantic(command, tooth, tooth_side):
    return {
                "command": command,
                "data": {
                    "zee": tooth,
                    "tooth_side": tooth_side,
                },
                "is_complete": False
            }
