import { InputNumber, Card, Space, Divider, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams, useRouteMatch } from 'react-router-dom'
import { db, firebase } from '../firebase'
import './teamAssessment.css'

import assessmentsJSON from '../../constants/assessment.json'

const { Title, Paragraph, Text } = Typography

export default function TeamAssessment({ jury }) {
	const { phase, teamId } = useParams()
	const assessment = assessmentsJSON[phase]
	const evaluations = assessment.evaluation

	const [team, setTeam] = useState({})
	const [evals, setEvals] = useState({})
	// const [redirect, setRedirect] = useState(false)
	const [juryName, setJuryName] = useState()

	const setTeamDetails = async () => {
		const team = await db.collection('teams').doc(teamId).get()
		// console.log(team)

		if (!team.exists) {
			alert('Team not found')
			console.error('Team not found')
		} else {
			// console.log('Team data:', team.data())
			setTeam(team.data())
		}
	}

	const evalScores = () => {
		let score = 0.0
		let isValid = true

		assessment.evaluation.forEach(evalObj => {
			if (!evals[evalObj.id] && evals[evalObj.id] !== 0) {
				isValid = false
			}

			score += parseFloat(evalObj.weight) * evals[evalObj.id]
		})

		const marks = {
			group: team.group,
			juryName: juryName,
			juryNumber: jury.phoneNumber,
			phase: phase,
			score,
			teamId: teamId,
			param1: evals[1],
			param2: evals[2],
			param3: evals[3],
			param4: evals[4],
			param5: evals[5],
			param6: evals[6] || 'NA',
			param7: evals[7] || 'NA',
			param8: evals[8] || 'NA',
			param9: evals[9] || 'NA',
			param10: evals[10] || 'NA',
		}

		// console.log('marks: ', marks)

		if (isValid) {
			db.collection('marks').add(marks)

			setEvals({})
			// setRedirect(true)
			alert(`Evaluation of Team number: ${teamId} done successfully!`)
			setTimeout(() => {
				window.location.href = `/phases/${phase}`
			}, 1000)
		} else {
			alert('Enter your rating for every input')
		}
	}

	useEffect(() => {
		const usr = firebase.auth().currentUser

		const unsubscribe = db.collection('jury').onSnapshot(snapshot => {
			const juryDetails = snapshot.docs.reduce((acc, doc, i) => {
				acc[doc.id] = doc.data()
				// console.log('Fetched jury details')
				return acc
			}, {})

			let jname
			if (juryDetails) {
				Object.keys(juryDetails).map(function (key, index) {
					if (juryDetails[key].number === usr.phoneNumber) {
						jname = juryDetails[key].name
						setJuryName(jname)
						// console.log('User found in db')
					}
				})
			}

			if (!jname) {
				// console.log('User not in db')
				alert('[Unauthorized] Jury not found in database')
				window.location.href = `/`
			}
		})

		return unsubscribe
	}, [])

	useEffect(() => {
		setTeamDetails()
	}, [])

	return (
		<div className='assessmentWrapper'>
			<Card>
				<div>
					<Typography>
						<Title>
							<Text>{assessment.title}</Text>
						</Title>
					</Typography>
					<Divider />
					<Typography>
						<Title
							level={4}
							style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
							<div>
								Team number: <Text>{teamId}</Text>
							</div>
							<div>
								Team name: <Text>{team?.name}</Text>
							</div>
						</Title>

						<Divider />
					</Typography>
					<Title level={4} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
						<Text>Assessment parameters</Text>
						<Text> 0-lowest, 10-highest</Text>
					</Title>
					{evaluations.map(param => (
						<div
							key={param.id}
							style={{
								display: 'grid',
								gridTemplateColumns: '2fr 1fr',
								alignItems: 'center',
							}}>
							<Typography>
								<Title level={5}>
									<Text style={{ marginRight: 5 }}>{param.id}.</Text>
									{param.title}
								</Title>
							</Typography>
							<div style={{ margin: 20, marginLeft: 50 }}>
								<InputNumber
									min={0}
									max={10}
									value={evals[param.id]}
									suffix='.out of 10'
									onChange={value =>
										setEvals(evals => ({ ...evals, [param.id]: value }))
									}
								/>
							</div>
						</div>
					))}
					<div>
						<Button onClick={evalScores} type='primary'>
							Submit
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}
