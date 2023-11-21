const router = require('express').Router()

const Musician = require('../Models/Musician')

//Create
router.post('/', async (req, res) => {
    const { name, instrument, email, phone } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome do musico é obrigatorio!' })
        return
    }

    const musician = {
        name,
        instrument,
        email,
        phone
    }

    try {
        //Criando dados
        await Musician.create(musician)
        res.status(201).json({ message: 'Musico cadastrado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
        console.log(error)
    }
})

//Read
router.get('/', async (req, res) => {
    try {
        //Mostrando todos os dados
        const musician = await Musician.find()
        res.status(200).json(musician)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Read by Id
router.get('/:id', async (req, res) => {
    //extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const musician = await Musician.findOne({ _id: id })

        if (!musician) {
            res.status(422).json({ message: 'Musico não existe!' })
            return
        }

        res.status(200).json(musician)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Update (PUT, PACH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, instrument, email, phone } = req.body

    const musician = {
        name,
        instrument,
        email,
        phone
    }

    try {
        const updatedMusician = await Musician.updateOne({ _id: id }, musician)

        if (updatedMusician.matchedCount === 0) {
            res.status(422).json({ message: 'Musico não existe!' })
            return
        }

        res.status(200).json(musician)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Delete
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    const musician = await Musician.findOne({ _id: id })

        if (!musician) {
            res.status(422).json({ message: 'Musico não existe!' })
            return
        }

        try {
            await Musician.deleteOne({_id: id})
            res.status(200).json({message: 'Musico removido com sucesso!'})
        } catch (error) {
            res.status(500).json({ error: error })
        }
})


module.exports = router