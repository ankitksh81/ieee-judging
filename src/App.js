import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './components/login/Login'
import Phases from './components/phases/Phases'
import { auth, firebase } from './components/firebase'
import HeaderLogos from './components/HeaderLogos'
import TeamAssessment from './components/TeamAssessment'
import InputTeam from './components/InputTeam'
import './App.css'
import { Button } from 'antd'

function App() {
	const [user, setUser] = useState(null)
	const [juryName, setJuryName] = useState(null)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authUser => {
			if (authUser) {
				//user logged in
				console.log(authUser)
				setUser(authUser)
			} else {
				//user logged out
				setUser(null)
			}
		})

		return () => {
			//perform cleanup
			unsubscribe()
		}
	}, [user])

	return (
		<>
			<HeaderLogos />
			<Router>
				<div style={{ display: 'flex', paddingLeft: '10%', paddingRight: '10%' }}>
					<Button
						style={{ marginLeft: 'auto' }}
						danger
						onClick={e => firebase.auth().signOut()}>
						LOGOUT
					</Button>
				</div>
				<Route exact path='/'>
					{user ? <Phases setJuryName={setJuryName} /> : <Login />}
					{/* {user ? <Phases /> : <Phases />} */}
				</Route>
				<Switch>
					<Route path='/phases/:phase'>
						<InputTeam jury={user} />
						{/* <InputTeam jury={{ name: 'JOHN THE JURY' }} /> */}
						<Route path='/phases/:phase/assessment/:teamId'>
							<TeamAssessment jury={user} />
						</Route>
					</Route>
				</Switch>
			</Router>
		</>
	)
}

export default App
