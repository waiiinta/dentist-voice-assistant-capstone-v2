from typing import Iterable

import grpc
from concurrent import futures

from grpc.aio import ServicerContext

import utils.ner_model_pb2 as ner_model_pb2
import utils.ner_model_pb2_grpc as ner_model_pb2_grpc

# from transformers import AutoTokenizer

from utils.model import TokenClassifier
from utils.parser_model import ParserModel
from utils.proto_utils import create_ner_response, create_incomplete_semantic
from utils.dictionary_mapping import DictionaryMapping

import config

NUMBER = ["หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ"]
ERROR_WORD = ["ที่", "สอง"]

class NERBackendServicer(ner_model_pb2_grpc.NERBackendServicer):
    def __init__(self, token_classifier: TokenClassifier, dict_map: DictionaryMapping):
        self.token_classifier = token_classifier
        self.dict_map = dict_map

    # Insert a logic of StreamingNER function
    def StreamingNER(
        self,
        request_iterator: Iterable[ner_model_pb2.NERRequest],
        context: ServicerContext,
    ) -> Iterable[ner_model_pb2.NERResponse]:
        """
        Wait for a response from clients, then predict tags from the response using wangchanberta model (ONNX CPU)
        """
        # Reset all the parameter when use this function
        sentences = []
        old_tooth_list = []
        old_is_final = True
        old_command, old_tooth, old_tooth_side, old_position, old_bridge_end = None, None, None, None, None
        parser = ParserModel() # independent parser
        # print("test")
        for request in request_iterator:
            # Concatenate trancripts in the responses
            if(request.add_missing.first_zee != 100 and request.add_missing.second_zee != 100):
                q, i = request.add_missing.first_zee, request.add_missing.second_zee
                parser.remove_zee_from_available_teeth_dict([q, i])
                continue
            elif(request.undo_missing.first_zee != 100 and request.undo_missing.second_zee != 100):
                q, i = request.undo_missing.first_zee, request.undo_missing.second_zee
                parser.append_zee_to_available_teeth_dict([q, i])
                continue

            sentence = ""
            # print("test2")
            for transcript in request.results:
                # fix the problem, when the user does not speak, but
                # gowajee output something. We do not consider the word
                # which has low confidence. 
                for word in transcript.word_timestamps:
                    print("Word", word.word)
                    print("Confidence", word.confidence)
                if len(transcript.word_timestamps) == 1 and (transcript.word_timestamps[0].word in ERROR_WORD and transcript.word_timestamps[0].confidence < 0.4) or\
                    transcript.word_timestamps[0].word in NUMBER and transcript.word_timestamps[0].confidence < 0.1: #transcript.word_timestamps[0].word == "สอง" and\
                    continue
                sentence += str(transcript.transcript)


            # print(request.results)
            sentence = self.dict_map.normalize(sentence)
            # hack, token classifier model cannot predict single number text, 
            # however if we add space at the end of the sentence it will resolve the problem
            # sentence = sentence + " " 

            if old_is_final:
                sentences.append(sentence)
                old_tooth_list = []
            else:
                sentences[-1] = sentence
            # print(sentences)

            # Predict the class of each token in the sentence
            # predicted_token = self.token_classifier.inference(sentence)
            # print(predicted_token)
            # Preprocess the predicted token and convert to semantic command
            semantics = parser.inference(sentence, self.token_classifier, request.is_final)
            # print(parser.semantic_object_list)
            # print(parser.completed_semantic_object)
            command, tooth, tooth_side, position, bridge_end, semantics = semantics.values()
            # print(tooth)
            # print(bridge_end)
            # Create an incomplete semantic for update display to frontend
            # 1.) first we consider that if there is not semantic from the result but the command is not None
            # then create incomplete semantic
            # 2.) second we consider that if there are more than one semantic, then there is two case which we need to consider
            # 2.1) the command in the last semantic is not the same as the command, this mean
            #      that there is a new command from the user but does not complete yet. 
            # 2.2) the command is a BOP command because when we speak the BOP format, it will always output one semantic
            #      unlike other command such as PDRE which doesn't output anything before speaking the payload value
            # 3.) last but note least the PDRE and the MGJ command has a sequential format, therefore these two command 
            #     must send incomplete only at the start of the command and frontend will do the rest, if not, the cursor
            #     will be pull back to the tooth of the incomplete command. Therefore, we need to separate the MGJ command
            #     from the other (PDRE) because the tooth_side in MGJ is None.
            # if ((len(semantics) == 0) or (len(semantics) > 0 and (semantics[-1]["command"] != command or tooth is None or tooth_side is None or command in ["BOP", "SUP"]))) \
            # and command \
            # and (command != old_command or old_tooth is None or old_tooth_side is None or \
            # ((command == old_command and command != "MGJ" and (tooth is None or tooth_side is None)) or \
            #  (command == old_command and command == "MGJ" and (tooth is None)) or \
            #  (command == old_command and command == "BOP" and (tooth != old_tooth)))): # or tooth != old_tooth or tooth_side != old_tooth_side):
            #     pass


            create_incomplete = False
            # 1. Missing, Crown, Implant 
            if command in ["Missing", "Crown", "Implant"]:
                # Missing
                if tooth is None:
                    create_incomplete = True
            # 2. PDRE, PD, RE
            elif command in ["PDRE", "PD", "RE"]:
                # PDRE
                if tooth is None and tooth_side is None:
                    create_incomplete = True
                # PDRE Buccal
                elif tooth is None:
                    create_incomplete = True
                # PDRE 18
                elif tooth_side is None:
                    create_incomplete = True
                # PDRE Buccal 18 (not fill payload yet)
                else:
                    if len(semantics) == 0 or (len(semantics) > 0 and command != semantics[-1]["command"]):
                        create_incomplete = True
            # 3. BOP, SUP
            elif command in ["BOP", "SUP"]:
                # BOP
                if tooth is None and tooth_side is None:
                    create_incomplete = True
                # BOP Buccal
                elif tooth is None:
                    create_incomplete = True
                # BOP 18
                elif tooth_side is None:
                    create_incomplete = True
                else:
                    # BOP Buccal 18 (not fill payload yet)
                    if len(semantics) == 0 or (len(semantics) > 0 and command != semantics[-1]["command"]):
                        create_incomplete = True
                    # BOP Buccal 18 Distal 16 
                    elif tooth != old_tooth:
                        create_incomplete = True
            # 4. MO
            elif command == "MO":
                # MO
                if tooth is None:
                    create_incomplete = True
                # MO 18
                elif len(semantics) == 0 or (len(semantics) > 0 and command != semantics[-1]["command"]):
                    create_incomplete = True
                # MO 18 2 16
                elif tooth != old_tooth:
                    create_incomplete = True
            # 5. MGJ
            elif command == "MGJ":
                # MGJ 
                if tooth is None:
                    create_incomplete = True
                # MGJ 18
                elif len(semantics) == 0 or (len(semantics) > 0 and command != semantics[-1]["command"]):
                    create_incomplete = True
            # 6.FUR
            elif command == "FUR":
                # FUR
                if tooth is None:
                    create_incomplete = True
                # (FUR 18) & (FUR 18 Distal)
                elif len(semantics) == 0 or (len(semantics) > 0 and command != semantics[-1]["command"]):
                    create_incomplete = True
                # (FUR 18 Distal 3 16) & (FUR 18 Distal 3 16 Distal)
                elif tooth != old_tooth:
                    create_incomplete = True
                # FUR 18 Distal Buccal
            # 7.bridge
            elif command == "Bridge":
                # Bridge
                if tooth is None:
                    create_incomplete = True
                # Bridge 14 (Haven't specify another zee of bridge crown)
                elif bridge_end is None:
                    create_incomplete = True


            if create_incomplete:
                update_display = create_incomplete_semantic(command, tooth, tooth_side, position)
                old_command, old_tooth, old_tooth_side, old_position, old_bridge_end = command, tooth, tooth_side, position, bridge_end
                semantics.insert(0, update_display)


            # print()
            # print(semantics)
            old_is_final = request.is_final
            # Create a dummy response
            if len(semantics) > 0:
                response = create_ner_response(semantics)
                ("response",print,response)
                yield response

address = f"[::]:{config.PORT}"


def main():
    # Initial tokenizer
    # tokenizer = AutoTokenizer.from_pretrained(
    #     "airesearch/wangchanberta-base-att-spm-uncased", revision="main"
    # )
    # Create token classifier and parser model
    token_classifier = TokenClassifier()
    dict_map = DictionaryMapping("dictionary_mapping.csv")

    # Create a gRPC server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=4))

    # Add NERBackendServicer to the server
    ner_model_pb2_grpc.add_NERBackendServicer_to_server(
        NERBackendServicer(token_classifier, dict_map), server
    )

    # Start the server
    server.add_insecure_port(address)
    server.start()
    print("Server serving at %s", address)
    server.wait_for_termination()


if __name__ == "__main__":
    main()
