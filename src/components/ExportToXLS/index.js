import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactExport from 'react-data-export'

import { db } from '../firebase'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

export default function ExportToXLS() {
	const [requirements, setRequirements] = useState()
	const [architect, setArchitect] = useState()
	const [coding, setCoding] = useState()
	const [final, setFinal] = useState()
	const [grand, setGrand] = useState()

	useEffect(() => {
		// console.log('[DEBUG] useeffect in exporttoxls]')
		// too lazy to rename these arrays
		const requirementArray = []
		const architectArray = []
		const codingArray = []
		const finalArray = []
		const grandArray = []

		const unsubscribe = db.collection('marks').onSnapshot(snap => {
			snap.forEach(doc => {
				const data = doc.data()

				if (data.group && data.group === 'Alternate Crop Recommendation')
					requirementArray.push(data)
				if (data.group && data.group === 'Automation of Vehicle Fitness Check')
					architectArray.push(data)
				if (data.group && data.group === 'Unsupervised Test') codingArray.push(data)
				if (data.group && data.group === 'Document Upload Tool') finalArray.push(data)
				if (data.group && data.group === 'Seed Certification') grandArray.push(data)
			})

			// console.log('[DEBUG] req ', requirementArray)
			// console.log('[DEBUG] architect ', architectArray)
			// console.log('[DEBUG] coding ', codingArray)
			// console.log('[DEBUG] final ', finalArray)
			// console.log('[DEBUG] grand ', grandArray)
		})

		setRequirements(requirementArray)
		setArchitect(architectArray)
		setCoding(codingArray)
		setFinal(finalArray)
		setGrand(grandArray)

		return unsubscribe
	}, [])

	return (
		<ExcelFile
			element={
				<Button style={{ marginLeft: 85 }} danger>
					Download Data grouped by 'group'
				</Button>
			}>
			<ExcelSheet data={requirements} name='Alternate Crop Recommendation'>
				<ExcelColumn label='Group' value='group' />
				<ExcelColumn label='Jury Name' value='juryName' />
				<ExcelColumn label='Jury Number' value='juryNumber' />
				<ExcelColumn label='phase' value='phase' />
				<ExcelColumn label='score' value='score' />
				<ExcelColumn label='teamId' value='teamId' />
				<ExcelColumn label='parameter 1' value='param1' />
				<ExcelColumn label='parameter 2' value='param2' />
				<ExcelColumn label='parameter 3' value='param3' />
				<ExcelColumn label='parameter 4' value='param4' />
				<ExcelColumn label='parameter 5' value='param5' />
				<ExcelColumn label='parameter 6' value='param6' />
				<ExcelColumn label='parameter 7' value='param7' />
				<ExcelColumn label='parameter 8' value='param8' />
				<ExcelColumn label='parameter 9' value='param9' />
				<ExcelColumn label='parameter 10' value='param10' />
			</ExcelSheet>
			<ExcelSheet data={architect} name='Automation of Vehicle Fitness Check'>
				<ExcelColumn label='Group' value='group' />
				<ExcelColumn label='Jury Name' value='juryName' />
				<ExcelColumn label='Jury Number' value='juryNumber' />
				<ExcelColumn label='phase' value='phase' />
				<ExcelColumn label='score' value='score' />
				<ExcelColumn label='teamId' value='teamId' />
				<ExcelColumn label='parameter 1' value='param1' />
				<ExcelColumn label='parameter 2' value='param2' />
				<ExcelColumn label='parameter 3' value='param3' />
				<ExcelColumn label='parameter 4' value='param4' />
				<ExcelColumn label='parameter 5' value='param5' />
				<ExcelColumn label='parameter 6' value='param6' />
				<ExcelColumn label='parameter 7' value='param7' />
				<ExcelColumn label='parameter 8' value='param8' />
				<ExcelColumn label='parameter 9' value='param9' />
				<ExcelColumn label='parameter 10' value='param10' />
			</ExcelSheet>
			<ExcelSheet data={coding} name='Unsupervised Test'>
				<ExcelColumn label='Group' value='group' />
				<ExcelColumn label='Jury Name' value='juryName' />
				<ExcelColumn label='Jury Number' value='juryNumber' />
				<ExcelColumn label='phase' value='phase' />
				<ExcelColumn label='score' value='score' />
				<ExcelColumn label='teamId' value='teamId' />
				<ExcelColumn label='parameter 1' value='param1' />
				<ExcelColumn label='parameter 2' value='param2' />
				<ExcelColumn label='parameter 3' value='param3' />
				<ExcelColumn label='parameter 4' value='param4' />
				<ExcelColumn label='parameter 5' value='param5' />
				<ExcelColumn label='parameter 6' value='param6' />
				<ExcelColumn label='parameter 7' value='param7' />
				<ExcelColumn label='parameter 8' value='param8' />
				<ExcelColumn label='parameter 9' value='param9' />
				<ExcelColumn label='parameter 10' value='param10' />
			</ExcelSheet>
			<ExcelSheet data={final} name='Document Upload Tool'>
				<ExcelColumn label='Group' value='group' />
				<ExcelColumn label='Jury Name' value='juryName' />
				<ExcelColumn label='Jury Number' value='juryNumber' />
				<ExcelColumn label='phase' value='phase' />
				<ExcelColumn label='score' value='score' />
				<ExcelColumn label='teamId' value='teamId' />
				<ExcelColumn label='parameter 1' value='param1' />
				<ExcelColumn label='parameter 2' value='param2' />
				<ExcelColumn label='parameter 3' value='param3' />
				<ExcelColumn label='parameter 4' value='param4' />
				<ExcelColumn label='parameter 5' value='param5' />
				<ExcelColumn label='parameter 6' value='param6' />
				<ExcelColumn label='parameter 7' value='param7' />
				<ExcelColumn label='parameter 8' value='param8' />
				<ExcelColumn label='parameter 9' value='param9' />
				<ExcelColumn label='parameter 10' value='param10' />
			</ExcelSheet>
			<ExcelSheet data={grand} name='Seed Certification'>
				<ExcelColumn label='Group' value='group' />
				<ExcelColumn label='Jury Name' value='juryName' />
				<ExcelColumn label='Jury Number' value='juryNumber' />
				<ExcelColumn label='phase' value='phase' />
				<ExcelColumn label='score' value='score' />
				<ExcelColumn label='teamId' value='teamId' />
				<ExcelColumn label='parameter 1' value='param1' />
				<ExcelColumn label='parameter 2' value='param2' />
				<ExcelColumn label='parameter 3' value='param3' />
				<ExcelColumn label='parameter 4' value='param4' />
				<ExcelColumn label='parameter 5' value='param5' />
				<ExcelColumn label='parameter 6' value='param6' />
				<ExcelColumn label='parameter 7' value='param7' />
				<ExcelColumn label='parameter 8' value='param8' />
				<ExcelColumn label='parameter 9' value='param9' />
				<ExcelColumn label='parameter 10' value='param10' />
			</ExcelSheet>
		</ExcelFile>
	)
}
