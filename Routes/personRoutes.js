const router = require('express').Router()

const Person = require('../Models/Person')

//Create
router.post('/', async (req, res) => {
    //{name: Vinicius, age: 21, chef: true}
    const { name, age, chef } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatorio!' })
        return
    }

    const person = {
        name,
        age,
        chef,
    }

    try {
        //Criando dados
        await Person.create(person)
        res.status(201).json({ message: 'Usuario inserido com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Read
router.get('/', async (req, res) => {
    try {
        //Mostrando todos os dados
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Read by Id
router.get('/:id', async (req, res) => {
    //extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'O usuario não existe!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Update (PUT, PACH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, age, chef } = req.body

    const person = {
        name,
        age,
        chef,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'O usuario não existe!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Delete
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'O usuario não existe!' })
            return
        }

        try {
            await Person.deleteOne({_id: id})
            res.status(200).json({message: 'Usuario removido com sucesso!'})
        } catch (error) {
            res.status(500).json({ error: error })
        }
})


module.exports = router