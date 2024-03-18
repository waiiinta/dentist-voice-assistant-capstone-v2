import json
import numpy as np
import torch
import math


class TokenClassifier:

    def __init__(self):

        self.vocab = {
            'ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ',
            'ลบ', 'ลิงกั้ว', 'ลิงกัว', 'บัคคัล', 'บัคคอล', 'มีเสี้ยว', 'ดิสทัล', 'ทั้งหมด', 'ถึง',
            'มิซซิ่ง', 'คลาวน์', 'คลาวด์', 'อิมแพลนต์', 'อิมแพลนท์', 'อิมพลานต์', 'อิมพลานท์', 'บริดจ์', 'พีดีอาร์อี', 'รีเส็ตชั่น','พีดีี','พีดีี','ทีดี','พีบี','อาร์อีบ','อาร์อี','อาร์์อี','อาร์อี์','อาร์อี',
            'เอ็มจีเจ', 'บรีดดิ้ง', 'บีโอพี', 'ซับปูเรชั่น', 'ซุปปูเรชั่น', 'โมบีลีตี้', 'เอ็มโอ', 'เฟอร์เคชั่น', 'ฟอร์เคชั่น', 'อันดู', 'อันโด' ,'ฟอร์เคชัน','ฟอรเคชัน',
            'ฟอเคชัน','ฟอเคชั่น','อเคชัน','อรเคชัน','ซอรเคชัน','ฟเคชัน','เคชัน','อรเคชั','คชัน','ฟอรชัน','ฟอชัน','เอสยูพี','เอสยูพี',
            'mิi่g','mิิ่g','mิin','mิิn','ปิิ่ง','mิing','miin','มิิn','มิิ้ง','มิิ่ง','มิing','เaชั','aชั','mิi่g','มิing','mิิ่ง','mิi่g',
            'เบรจ','เบรท',

        }


    def inference(self, sentence):
        dp = self.maximal_matching(sentence)
        tokenized = self.backtrack(dp, sentence)
        # tokenized = sentence.split()
        labeled_token = self.labeled_token(tokenized)
        return labeled_token
        
    
    def maximal_matching(self, test_sentences):
        dp  =[[None]*len(test_sentences) for _ in range(len(test_sentences))]
        min_col = [len(test_sentences) for _ in range(len(test_sentences))]
        for i in range(len(test_sentences)):
            for j in range(len(test_sentences)):
                if i > j:continue
                elif i == 0 and test_sentences[i:j+1] in self.vocab:
                    dp[i][j] = 1
                    min_col[j] = min(min_col[j], dp[i][j])
                elif test_sentences[i:j+1] in self.vocab:
                    dp[i][j] = 1 + min_col[i-1]
                    min_col[j] = min(min_col[j], dp[i][j])
                else:
                    dp[i][j] = math.inf
        return dp
    
    def backtrack(self,dp, sentence):
        tokenized = []
        eow = len(dp)-1
        word_pos = []
        have_oov = False
        while eow >= 0:
            minn = math.inf
            for i in range(eow+1):
                if minn > dp[i][eow]:
                    minn = dp[i][eow]
                    sow = i
            if minn == math.inf:
                if not have_oov:
                    oov_end = eow
                    have_oov = True
                eow = eow - 1
            else:
                if have_oov:
                    oov_start = eow + 1
                    word_pos.append((oov_start, oov_end))
                    have_oov = False
                word_pos.append((sow,eow))
                eow = sow - 1
        word_pos.reverse()
        for sow, eow in word_pos:
            tokenized.append(sentence[sow:eow+1])
        return tokenized
    

    
    def labeled_token(self, tokens):
        token_label_list = []

        for token in tokens:
            if token in ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ']:
                token_label_list.append([token, "Number"])
            elif token in ['ลบ']:
                token_label_list.append([token, "Symbol"])
            elif token in ['ลิงกั้ว', 'ลิงกัว', 'บัคคัล', 'บัคคอล', 'มีเสี้ยว', 'ดิสทัล', 'ทั้งหมด']:
                token_label_list.append([token, "Side"])
            elif token in ['มิซซิ่ง','mิi่g','mิิ่g','mิin','mิิn','ปิิ่ง','mิing','miin','มิิn','มิิ้ง','มิิ่ง','มิing','เaชั','aชั','mิi่g','มิing','mิิ่ง','mิi่g','มิิ่','mig','mิิg']:
                token_label_list.append([token, "Missing"])
            elif token in ['คลาวน์', 'คลาวด์']:
                token_label_list.append([token, "Crown"])
            elif token in ['อิมแพลนต์', 'อินแพลนท์', 'อิมพลานต์', 'อิมพลานท์']:
                token_label_list.append([token, "Implant"])
            elif token in ['บริดจ์','เบรจ','เบรท']:
                token_label_list.append([token, "Bridge"])
            elif token in ['พีดีอาร์อี']:
                token_label_list.append([token, "PDRE"])
            elif token in ['พีดีี','พีดีี','ทีดี','พีบี']:
                token_label_list.append([token, "PD"])
            elif token in ['รีเส็ตชั่น','อาร์์อี','อาร์อี์','อาร์อี']:
                token_label_list.append([token, "RE"])
            elif token in ['เอ็มจีเจ']:
                token_label_list.append([token, "MGJ"])
            elif token in ['บรีดดิ้ง', 'บีโอพี']:
                token_label_list.append([token, "BOP"])
            elif token in ['ซับปูเรชั่น', 'ซุปปูเรชั่น','เอสยูพี','เอสยูพี']:
                token_label_list.append([token, "SUP"])
            elif token in ['โมบีลีตี้', 'เอ็มโอ']:
                token_label_list.append([token, "MO"])
            elif token in ['เฟอร์เคชั่น', 'ฟอร์เคชั่น','ฟอร์เคชัน','ฟอรเคชัน','ฟอเคชัน','ฟอเคชั่น','อเคชัน','อรเคชัน','ซอรเคชัน','ฟเคชัน','เคชัน','อรเคชั','คชัน','ฟอรชัน','ฟอชัน']:
                token_label_list.append([token, "FUR"])
            elif token in ['อันดู', 'อันโด']:
                token_label_list.append([token, "Undo"])
            elif token in ['ถึง']:
                token_label_list.append([token, "To"])
        print(token_label_list)
        return token_label_list
