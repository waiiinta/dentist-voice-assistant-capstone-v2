from utils.parser_related_function import append_zee_to_available_teeth_dict, remove_zee_from_available_teeth_dict, create_result_list, create_semantic_object
import re
import copy

class ParserModel:
    def __init__(self):
        self.semantic_object_list = []
        self.last_pdre_state = {'command': None}
        self.available_teeth_dict = {
            1: [[1, x] for x in range(8, 0, -1)], 
            2: [[2, x] for x in range(1, 9)], 
            3: [[3, x] for x in range(8, 0, -1)], 
            4: [[4, x] for x in range(1, 9)]
        }
        self.last_symbol = False
        self.prev_token = "None"
        self.prev_distant = -1


    def inference(self, sentence, token_classifier, save=False, threshold=3):
        ''' 
        Input: 
            - sentence: a consider sentence which want to parse
            - token_classifier: a token classifier (WanChangBerta) for tokenize the sentence
            - save: whether, save the new parameters to the old parameters or not
            - threshold: CER threshold
        '''
        tokens = token_classifier.inference(sentence)
        semantic = self.parse(tokens, threshold=threshold, save=save ) 
        return semantic # result
               

    def parse(self, tokens, save=False, threshold=5):
        '''
        Input: 
            - tokens: a list of tokens which obtains from the token classifier model
            - save: whether, save the new parameters to the old parameters or not
            - threshold: CER threshold
        '''
        new_semantic_object_list = copy.deepcopy(self.semantic_object_list)
        new_last_pdre_state = copy.deepcopy(self.last_pdre_state)
        
        word_list = create_result_list(tokens, threshold, self.last_symbol)
        result = create_semantic_object(new_semantic_object_list, word_list, self.available_teeth_dict, new_last_pdre_state)


        if save:
            self.semantic_object_list = new_semantic_object_list
            self.last_pdre_state = new_last_pdre_state
            self.last_symbol = False

            if len(tokens) > 0:
                self.last_symbol = tokens[-1][1] == "Symbol"

        return result

    def append_zee_to_available_teeth_dict(self, zee):
        assert len(zee) == 2, "Zee must contain the quadrant and index of the tooth."
        append_zee_to_available_teeth_dict(zee, self.available_teeth_dict)

    def remove_zee_from_available_teeth_dict(self, zee):
        assert len(zee) == 2, "Zee must contain the quadrant and index of the tooth."
        remove_zee_from_available_teeth_dict(zee, self.available_teeth_dict)

    def reset(self):
        self.semantic_object_list = []
        self.last_pdre_state = {'command': None}
        self.available_teeth_dict = {
            1: [[1, x] for x in range(8, 0, -1)], 
            2: [[2, x] for x in range(1, 9)], 
            3: [[3, x] for x in range(8, 0, -1)], 
            4: [[4, x] for x in range(1, 9)]
        }
        self.last_symbol = False
        self.prev_token = "None"
        self.prev_distant = -1