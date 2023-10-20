import { Questionary } from '../types/Questionary'
import { getStorageUser } from '../storage/userStorage'


const user = getStorageUser()
const userGender = user?.gender

export var questions: Questionary[] = [
    {
        question: 'Qual foi a última vez que você doou sangue?',
        answares: [
            'Nunca doei',
            'Menos de um mês',
            'Último mês',
            'Há dois meses',
            'Há três meses',
        ],
        correctAnswareIndex: userGender == 'male' ? [0, 3, 4] : [0, 4]
    },
    {
        question: 'Já fez transfusão de sangue anteriormente?',
        answares: [
            'Sim, há um ano',
            'Sim, há menos de um ano',
            'Sim, há mais de um ano',
            'Não'
        ],
        correctAnswareIndex: [0, 2, 3]
    },
    {
        question: 'Teve alguma cirurgia nos últimos 6 meses?',
        answares: [
            'Sim',
            'Não'
        ],
        correctAnswareIndex: [1]
    },
    {
        question: 'Fez tatuagem e/ou piercing nos últimos 6 meses?',
        answares: [
            'Sim',
            'Não'
        ],
        correctAnswareIndex: [1]
    },
    {
        question: 'Já teve diagnóstico de doenças infecciosas, como HIV, Hepatite B, Hepatite C, Sífilis?',
        answares: [
            'Sim',
            'Não'
        ],
        correctAnswareIndex: [1]
    },
    {
        question: 'Fez sexo ou ingeriu álcool nas últimas 12h?',
        answares: [
            'Sim',
            'Não'
        ],
        correctAnswareIndex: [1]
    },
    {
        question: 'Foi vacinado nas últimas 48h?',
        answares: [
            'Sim',
            'Não'
        ],
        correctAnswareIndex: [1]
    },
    {
        question: 'Está com anemia atualmente?',
        answares: [
            'Sim',
            'Não'
        ],
        correctAnswareIndex: [1]
    },
    {
        question: 'Tem menos de 50 quilos?',
        answares: [
            'Sim',
            'Não'
        ],
        correctAnswareIndex: [1]
    },
    {
        question: 'Está gravida ou amamentando?',
        answares: [
            'Sim',
            'Não'
        ],
        correctAnswareIndex: [1]
    },
]