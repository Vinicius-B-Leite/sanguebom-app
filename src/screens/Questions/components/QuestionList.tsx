import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { QuestionType } from '../../../types/QuestionType';
import Question from '../../../components/Question';
import Questionary from './QuestionaryButton';
import QuestionaryButton from './QuestionaryButton';



type Props = {
    questions: QuestionType[] | undefined,
    refetch: () => Promise<void>
}
const QuestionList: React.FC<Props> = ({ questions, refetch }) => {
    const [refreshList, setRefreshList] = useState(false)

    const handleRefresh = async () => {
        setRefreshList(true)
        await refetch()
        setRefreshList(false)
    }

    return (
        <FlatList
            testID='questionsList'
            contentContainerStyle={{ padding: '5%' }}
            data={questions}
            renderItem={({ item }) => <Question item={item} />}
            refreshing={refreshList}
            onRefresh={handleRefresh}
            ListHeaderComponent={() => <QuestionaryButton />}
        />
    )
}

export default QuestionList;