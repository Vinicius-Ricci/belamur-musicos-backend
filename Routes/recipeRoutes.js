const router = require('express').Router()

const Recipe = require('../Models/Recipe')

//Create
router.post('/', async (req, res) => {
    const { name, ingredients, preparation } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome da receita é obrigatorio!' })
        return
    }

    const recipe = {
        name,
        ingredients,
        preparation
    }

    try {
        //Criando dados
        await Recipe.create(recipe)
        res.status(201).json({ message: 'Receita cadastrada com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Read
router.get('/', async (req, res) => {
    try {
        //Mostrando todos os dados
        const recipe = await Recipe.find()
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Read by Id
router.get('/:id', async (req, res) => {
    //extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const recipe = await Recipe.findOne({ _id: id })

        if (!recipe) {
            res.status(422).json({ message: 'Receita não existe!' })
            return
        }

        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Update (PUT, PACH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, ingredients, preparation } = req.body

    const recipe = {
        name,
        ingredients,
        preparation
    }

    try {
        const updatedRecipe = await Recipe.updateOne({ _id: id }, recipe)

        if (updatedRecipe.matchedCount === 0) {
            res.status(422).json({ message: 'Receita não existe!' })
            return
        }

        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Delete
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    const recipe = await Recipe.findOne({ _id: id })

        if (!recipe) {
            res.status(422).json({ message: 'Receita não existe' })
            return
        }

        try {
            await Recipe.deleteOne({_id: id})
            res.status(200).json({message: 'Receita removida com sucesso!'})
        } catch (error) {
            res.status(500).json({ error: error })
        }
})


module.exports = router