import { Button, Input, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams, useRouteMatch } from 'react-router-dom'
import './index.css'

import { db, firebase } from '../firebase'
import assessmentsJSON from '../../constants/assessment.json'

const { Title, Paragraph, Text } = Typography

export default function InputTeam({ jury }) {
	const [teamId, setTeamId] = useState()
	const [redirect, setRedirect] = useState()

	const { phase } = useParams()
	const { path, url } = useRouteMatch()

	const routeToTeamAssessment = () => {
		const route = `${url}/assessment/${teamId}`
		// console.log(url)
		setRedirect(route)
	}

	return redirect ? (
		<Redirect to={redirect} />
	) : (
		<>
			<div style={{ display: 'flex', paddingLeft: '10%', paddingRight: '10%' }}>
				{/* <Button
					style={{ marginLeft: 'auto' }}
					danger
					onClick={e => firebase.auth().signOut()}>
					LOGOUT
				</Button> */}
			</div>
			<div
				style={{
					display: 'grid',
					placeItems: 'center',
					height: '100%',
					marginTop: '-100px',
				}}>
				<div>
					<Typography>
						<Title className='phase__heading'>{assessmentsJSON[phase].title}</Title>
						<div className='team__input'>
							<Space>
								<Paragraph className='team__para'>Enter Team ID to start</Paragraph>

								<Input
									className='team__input'
									value={teamId}
									onChange={e => setTeamId(e.target.value)}
								/>
								<Button onClick={routeToTeamAssessment}>Evaluate</Button>
							</Space>
						</div>
					</Typography>
				</div>
			</div>
		</>
	)
}
