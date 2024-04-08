import { User } from '@/app/types/user';
import { BaseConstants, MockServerResponse } from '../types/mockServer';
import path from 'path';
import fs from 'fs';
import { getRandomSubarray } from './utils/arrayUtils';

export const generateUserContext = async (
  user: User
): Promise<MockServerResponse> => {
  const baseConstants = getLevelLetters(user);
  const baseText = await getBaseText(baseConstants);
  return {
    typerInputPayload: {
      context: {
        baseConstants,
        baseText
      }
    }
  };
};
const getBaseText = async (baseContants: BaseConstants): Promise<string> => {
  const filePath = path.join(process.cwd(), `/public/${DATA_LIST[1].path}`);
  const fileContent = fs
    .readFileSync(filePath, 'utf-8')
    .replace(/\\r\\n|\r\n|\r|\n|\\/g, ' ')
    .replace(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, ' ');

  const filteredContent = filterWords(
    fileContent,
    baseContants.baseLetters,
    baseContants.baseLength
  );

  return filteredContent.join(' ');
};

const getLevelLetters = (user: User): BaseConstants => {
  const alphabet = 'eaosrnidlctumpbgvyqhfzjx';
  const lengths = [
    `1,6`,
    `2,7`,
    `3,8`,
    `4,9`,
    `5,10`,
    `5,11`,
    `5,12`,
    `5,13`,
    `5,14`,
    `5,15`
  ];
  const MAX_LEVEL = 10;
  const level = user.level;
  const baseLetters =
    level >= 1 && level <= MAX_LEVEL
      ? alphabet.slice(0, Math.round((alphabet.length / 5) * level))
      : '';
  const baseLength =
    level >= 1 && level <= MAX_LEVEL
      ? lengths[Math.round(((lengths.length - 1) / MAX_LEVEL) * level)]
      : lengths[0];
  return { baseLetters, baseLength };
};

const filterWords = (
  fileContent: string,
  baseLetters: string,
  size: string
): string[] => {
  const words = fileContent.split(' ').filter((word) => word.length > 1);
  const uniqueWords = Array.from(new Set(words));
  const filteredWords = (size: string) => {
    const filteredWords = uniqueWords.filter((word) => {
      const letters = word.toLowerCase();
      const regex = new RegExp(
        `^(?=.*[${baseLetters}])(?!.*[^${baseLetters}]).{${size}}$`
      );

      return regex.test(letters);
    });

    return getRandomSubarray(filteredWords, 15);
  };

  const filteredWordsText = filteredWords(size);

  return filteredWordsText;
};

const DATA_LIST = [
  {
    id: 1,
    name: 'Bible KJV',
    path: 'data/Bible_KJV.txt'
  },
  {
    id: 2,
    name: "Harry Potter and the Sorcerer's Stone",
    path: 'data/Harry_Potter_1_Sorcerers_Stone.txt'
  },
  {
    id: 3,
    name: 'Harry Potter and the Chamber of Secrets',
    path: 'data/Harry_Potter_2_The_Chamber_Of_Secrets.txt'
  },
  {
    id: 4,
    name: 'Harry Potter and the Prisoner of Azkaban',
    path: 'data/Harry_Potter_3_Prisoner_of_Azkaban.txt'
  },
  {
    id: 5,
    name: 'Harry Potter and the Goblet of Fire',
    path: 'data/Harry_Potter_4_The_Goblet_of_Fire.txt'
  }
];
